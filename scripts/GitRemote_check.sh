if git remote | grep -q .; then
    git pull >> "$LOG_FILE" 2>&1 || fail "git pull ჩავარდა"
else
    log "${YELLOW}[SKIP]${NC} Git remote არ არის" "SKIP: no remote"
fi