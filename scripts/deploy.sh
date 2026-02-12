#!/bin/bash
set -euo pipefail

# ==============================
# CONFIG
# ==============================

APP_DIR="$HOME/docker-app"
LOG_FILE="$APP_DIR/deploy.log"

DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Colors
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m"

# ==============================
# FUNCTIONS
# ==============================

log() {
    local msg="$1"
    local file_msg="$2"

    echo -e "[$DATE] $msg"
    echo "[$DATE] $file_msg" >> "$LOG_FILE"
}

fail() {
    log "${RED}[ERROR]${NC} $1" "FAILED: $1"
    exit 1
}

# ==============================
# START
# ==============================

mkdir -p "$APP_DIR"
touch "$LOG_FILE"

cd "$APP_DIR" || fail "ვერ შევედი APP_DIR-ში"

log "${YELLOW}=== DEPLOY STARTED ===${NC}" "DEPLOY START"

# ==============================
# STEP 1: GIT PULL
# ==============================

log "${YELLOW}[1/4]${NC} Git pull..." "START: git pull"

if git remote | grep -q .; then
    git pull >> "$LOG_FILE" 2>&1 || fail "git pull ჩავარდა"
else
    log "${YELLOW}[SKIP]${NC} Git remote არ არის" "SKIP: no remote"
fi

log "${GREEN}[OK]${NC} კოდი განახლდა" "SUCCESS: git pull"

# ==============================
# STEP 2: STOP CONTAINERS
# ==============================

log "${YELLOW}[2/4]${NC} Containers stopping..." "START: docker down"

docker compose down >> "$LOG_FILE" 2>&1 || fail "docker down ჩავარდა"

log "${GREEN}[OK]${NC} გაჩერდა" "SUCCESS: containers stopped"

# ==============================
# STEP 3: BUILD / PULL
# ==============================

log "${YELLOW}[3/4]${NC} Pull & Build..." "START: build"

docker compose pull >> "$LOG_FILE" 2>&1 || fail "docker pull ჩავარდა"
docker compose build --no-cache >> "$LOG_FILE" 2>&1 || fail "docker build ჩავარდა"

log "${GREEN}[OK]${NC} Build დასრულდა" "SUCCESS: build complete"

# ==============================
# STEP 4: START
# ==============================

log "${YELLOW}[4/4]${NC} Starting containers..." "START: docker up"

docker compose up -d >> "$LOG_FILE" 2>&1 || fail "docker up ჩავარდა"

log "${GREEN}[OK]${NC} გაეშვა" "SUCCESS: containers started"

# ==============================
# STATUS
# ==============================

echo ""
echo "=========================================="
echo " Container Status"
echo "=========================================="
docker compose ps
echo ""

# ==============================
# DONE
# ==============================

log "${GREEN}=== DEPLOY FINISHED ===${NC}" "DEPLOY SUCCESS"

echo "=========================================="
echo -e " ${GREEN}DEPLOY COMPLETE${NC} — $DATE"
echo "=========================================="