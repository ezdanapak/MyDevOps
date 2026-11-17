#!/usr/bin/env python3
"""Validate a built MkDocs site (PWA + self-hosting rules). Standard library only.

Usage: python3 scripts/validate_site.py SITE_DIR [--mkdocs mkdocs.yml]
Exit code 0 = all checks passed, 1 = at least one failed.
"""
import argparse
import json
import re
import struct
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse, urljoin

REQUIRED_MANIFEST = ("name", "short_name", "start_url", "scope", "display", "theme_color", "background_color", "icons")
FORBIDDEN_HOSTS = ("fonts.googleapis.com", "fonts.gstatic.com", "unpkg.com")
PNG_SIG = b"\x89PNG\r\n\x1a\n"


def site_url_path(mkdocs_yml: Path) -> str:
    m = re.search(r"^site_url:\s*(\S+)", mkdocs_yml.read_text(encoding="utf-8"), re.M)
    if not m:
        raise ValueError("site_url not found in mkdocs.yml")
    path = urlparse(m.group(1).strip("'\"")).path or "/"
    return path if path.endswith("/") else path + "/"


def png_size(path: Path):
    data = path.read_bytes()[:24]
    if data[:8] != PNG_SIG or data[12:16] != b"IHDR":
        return None
    return struct.unpack(">II", data[16:24])


class Collector(HTMLParser):
    """Collects URL-bearing attributes and inline <style> text (code samples are ignored)."""

    def __init__(self):
        super().__init__()
        self.urls = []      # (tag, attr, value)
        self.styles = []
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for a in ("href", "src"):
            if d.get(a):
                self.urls.append((tag, a, d[a]))
        if tag == "style":
            self._in_style = True

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False

    def handle_data(self, data):
        if self._in_style:
            self.styles.append(data)


def resolve_local(site: Path, page: Path, url: str, base: str = "/"):
    """Return the file a site-relative URL maps to, or None if external/ignorable."""
    p = urlparse(url)
    if p.scheme or p.netloc or url.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    path = unquote(p.path)
    if not path:
        return None
    if path.startswith("/"):
        if base != "/" and path.startswith(base):
            path = path[len(base):]
        target = site / path.lstrip("/")
    else:
        target = page.parent / path
    try:
        target = target.resolve()
        target.relative_to(site.resolve())
    except (ValueError, OSError):
        return target
    if target.is_dir():
        return target / "index.html"
    return target


def check(site: Path, mkdocs_yml: Path):
    errors = []
    site = site.resolve()

    # --- manifest ---
    manifest_path = site / "manifest.webmanifest"
    manifest = None
    if not manifest_path.is_file():
        errors.append("manifest.webmanifest missing at site root")
    else:
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except ValueError as e:
            errors.append(f"manifest is not valid JSON: {e}")
    expected = site_url_path(mkdocs_yml)
    if isinstance(manifest, dict):
        for k in REQUIRED_MANIFEST:
            if k not in manifest:
                errors.append(f"manifest missing field: {k}")
        for k in ("start_url", "scope"):
            if manifest.get(k) != expected:
                errors.append(f"manifest {k} {manifest.get(k)!r} != site_url path {expected!r}")
        for icon in manifest.get("icons", []):
            f = manifest_path.parent / icon.get("src", "")
            if not f.is_file():
                errors.append(f"icon missing: {icon.get('src')}")
                continue
            size = png_size(f)
            want = icon.get("sizes", "")
            if size is None:
                errors.append(f"icon is not a PNG: {icon.get('src')}")
            elif f"{size[0]}x{size[1]}" != want:
                errors.append(f"icon {icon.get('src')} is {size[0]}x{size[1]}, manifest says {want}")

    # --- service worker ---
    sw = site / "service-worker.js"
    if not sw.is_file():
        errors.append("service-worker.js missing at site root (scope would be wrong)")
    else:
        text = sw.read_text(encoding="utf-8")
        m = re.search(r"var SHELL = \[(.*?)\];", text, re.S)
        if not m:
            errors.append("precache SHELL list not found in service-worker.js")
        else:
            for rel in re.findall(r"'([^']+)'", m.group(1)):
                if not (site / rel).is_file():
                    errors.append(f"precache URL not in build: {rel}")
        if "mydevops-" not in text:
            errors.append("service worker cache names are not prefixed 'mydevops-'")

    reg = site / "assets" / "js" / "pwa-register.js"
    if not reg.is_file():
        errors.append("assets/js/pwa-register.js missing")

    # --- notices ---
    if not (site / "THIRD-PARTY-NOTICES" / "index.html").is_file():
        errors.append("THIRD-PARTY-NOTICES page missing")

    # --- HTML: links and forbidden hosts ---
    seen_register = False
    for page in sorted(site.rglob("*.html")):
        parser = Collector()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))
        rel_page = page.relative_to(site)
        for tag, attr, value in parser.urls:
            host = urlparse(value).netloc
            if any(h in host for h in FORBIDDEN_HOSTS):
                errors.append(f"{rel_page}: <{tag} {attr}> requests forbidden host {host}")
            if tag == "script" and attr == "src" and value.endswith("pwa-register.js"):
                seen_register = True
                _t = resolve_local(site, page, value, expected)
                if _t is None or not _t.is_file():
                    errors.append(f"{rel_page}: pwa-register.js path does not resolve")
            if tag == "a" or tag in ("link", "script", "img", "source"):
                target = resolve_local(site, page, value, expected)
                if target is not None and not target.exists():
                    errors.append(f"{rel_page}: broken {attr} {value}")
        css = "\n".join(parser.styles)
        for h in FORBIDDEN_HOSTS:
            if h in css:
                errors.append(f"{rel_page}: inline <style> references {h}")
    if not seen_register:
        errors.append("no page loads pwa-register.js")

    # --- CSS files must not import forbidden hosts ---
    for css_file in site.rglob("*.css"):
        t = css_file.read_text(encoding="utf-8", errors="replace")
        for h in FORBIDDEN_HOSTS:
            if h in t:
                errors.append(f"{css_file.relative_to(site)} references {h}")
    return errors


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("site")
    ap.add_argument("--mkdocs", default="mkdocs.yml")
    args = ap.parse_args(argv)
    errors = check(Path(args.site), Path(args.mkdocs))
    if errors:
        print(f"FAILED: {len(errors)} problem(s)")
        for e in errors:
            print(" -", e)
        return 1
    print("OK: all site checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
