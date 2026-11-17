import json
import struct
import sys
import tempfile
import unittest
import zlib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
import validate_site as v  # noqa: E402


def png(w, h):
    def chunk(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    raw = b"".join(b"\x00" + b"\x00\x00\x00" * w for _ in range(h))
    return v.PNG_SIG + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b"")


MANIFEST = {
    "name": "T", "short_name": "T", "start_url": "/Site/", "scope": "/Site/", "display": "standalone",
    "theme_color": "#000", "background_color": "#fff",
    "icons": [{"src": "icon.png", "sizes": "192x192", "type": "image/png"}],
}
INDEX = '<html><head><link rel="manifest" href="manifest.webmanifest"></head><body><a href="other/">o</a><script src="pwa-register.js"></script></body></html>'
SW = "var SHELL = [\n  'offline.html'\n];\nvar P='mydevops-x';"


class Base(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.site = self.root / "site"
        (self.site / "assets" / "js").mkdir(parents=True)
        (self.site / "other").mkdir()
        (self.site / "THIRD-PARTY-NOTICES").mkdir()
        (self.site / "THIRD-PARTY-NOTICES" / "index.html").write_text("<p>x</p>")
        (self.site / "other" / "index.html").write_text("<p>other</p>")
        (self.site / "index.html").write_text(INDEX.replace('src="pwa-register.js"', 'src="assets/js/pwa-register.js"'))
        (self.site / "assets" / "js" / "pwa-register.js").write_text("//")
        (self.site / "offline.html").write_text("<p>offline</p>")
        (self.site / "service-worker.js").write_text(SW)
        (self.site / "icon.png").write_bytes(png(192, 192))
        self.manifest = dict(MANIFEST)
        self.write_manifest()
        self.yml = self.root / "mkdocs.yml"
        self.yml.write_text("site_url: https://example.github.io/Site/\n")

    def write_manifest(self):
        (self.site / "manifest.webmanifest").write_text(json.dumps(self.manifest))

    def errors(self):
        return v.check(self.site, self.yml)


class TestValid(Base):
    def test_clean_site_passes(self):
        self.assertEqual(self.errors(), [])


class TestManifest(Base):
    def test_missing_field(self):
        del self.manifest["short_name"]
        self.write_manifest()
        self.assertTrue(any("short_name" in e for e in self.errors()))

    def test_invalid_json(self):
        (self.site / "manifest.webmanifest").write_text("{nope")
        self.assertTrue(any("not valid JSON" in e for e in self.errors()))

    def test_scope_mismatch(self):
        self.manifest["scope"] = "/Wrong/"
        self.write_manifest()
        self.assertTrue(any("scope" in e for e in self.errors()))

    def test_icon_wrong_dimensions(self):
        (self.site / "icon.png").write_bytes(png(100, 100))
        self.assertTrue(any("is 100x100" in e for e in self.errors()))

    def test_icon_missing(self):
        (self.site / "icon.png").unlink()
        self.assertTrue(any("icon missing" in e for e in self.errors()))


class TestWorker(Base):
    def test_precache_url_missing(self):
        (self.site / "offline.html").unlink()
        self.assertTrue(any("precache URL not in build" in e for e in self.errors()))

    def test_worker_missing(self):
        (self.site / "service-worker.js").unlink()
        self.assertTrue(any("service-worker.js missing" in e for e in self.errors()))

    def test_cache_prefix_required(self):
        (self.site / "service-worker.js").write_text("var SHELL = ['offline.html'];")
        self.assertTrue(any("prefixed" in e for e in self.errors()))


class TestHtml(Base):
    def test_broken_link(self):
        (self.site / "index.html").write_text(INDEX.replace('src="pwa-register.js"', 'src="assets/js/pwa-register.js"').replace("other/", "missing/"))
        self.assertTrue(any("broken href missing/" in e for e in self.errors()))

    def test_forbidden_host_in_link_tag(self):
        html = INDEX.replace('src="pwa-register.js"', 'src="assets/js/pwa-register.js"').replace("<head>", '<head><link href="https://fonts.googleapis.com/css" rel="stylesheet">')
        (self.site / "index.html").write_text(html)
        self.assertTrue(any("forbidden host" in e for e in self.errors()))

    def test_forbidden_host_in_code_sample_is_ignored(self):
        html = INDEX.replace('src="pwa-register.js"', 'src="assets/js/pwa-register.js"').replace("<body>", "<body><pre>https://fonts.googleapis.com/css</pre>")
        (self.site / "index.html").write_text(html)
        self.assertEqual(self.errors(), [])

    def test_absolute_base_path_resolves(self):
        html = INDEX.replace('src="pwa-register.js"', 'src="assets/js/pwa-register.js"').replace('href="other/"', 'href="/Site/other/"')
        (self.site / "index.html").write_text(html)
        self.assertEqual(self.errors(), [])

    def test_register_script_not_loaded(self):
        (self.site / "index.html").write_text("<html><body>none</body></html>")
        self.assertTrue(any("no page loads pwa-register.js" in e for e in self.errors()))

    def test_notices_required(self):
        (self.site / "THIRD-PARTY-NOTICES" / "index.html").unlink()
        self.assertTrue(any("THIRD-PARTY" in e for e in self.errors()))


class TestHelpers(unittest.TestCase):
    def test_site_url_path(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "m.yml"
            p.write_text("site_url: https://a.github.io/Name\n")
            self.assertEqual(v.site_url_path(p), "/Name/")

    def test_png_size_rejects_non_png(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "x.png"
            p.write_bytes(b"not a png at all, just text")
            self.assertIsNone(v.png_size(p))


if __name__ == "__main__":
    unittest.main()
