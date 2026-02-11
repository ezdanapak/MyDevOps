Task 19 — Deployment Script


სკრიპტის შექმნა:
bashnano ~/docker-app/deploy.sh

#!/bin/bash
# ============================================
# Deployment Script — docker-app
# ============================================

set -e

APP_DIR="$HOME/docker-app"
LOG_FILE="$APP_DIR/deploy.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "$1"
    echo "[$DATE] $2" >> "$LOG_FILE"
}

echo "=========================================="
echo " Deploy Started — $DATE"
echo "=========================================="

cd "$APP_DIR"

# --- Step 1: Git Pull ---
log "${YELLOW}[1/4]${NC} Git pull..." "START: git pull"

git pull 2>> "$LOG_FILE"

if [ $? -ne 0 ]; then
    log "${RED}[ERROR]${NC} Git pull ვერ მოხერხდა!" "FAILED: git pull"
    exit 1
fi
log "${GREEN}[OK]${NC}    კოდი განახლდა" "SUCCESS: git pull"

# --- Step 2: Stop Containers ---
log "${YELLOW}[2/4]${NC} Container-ების გაჩერება..." "START: docker compose down"

docker compose down 2>> "$LOG_FILE"

log "${GREEN}[OK]${NC}    გაჩერდა" "SUCCESS: containers stopped"

# --- Step 3: Rebuild ---
log "${YELLOW}[3/4]${NC} Rebuild & Pull images..." "START: docker compose build"

docker compose pull 2>> "$LOG_FILE"
docker compose build --no-cache 2>> "$LOG_FILE"

log "${GREEN}[OK]${NC}    Rebuild დასრულდა" "SUCCESS: rebuild complete"

# --- Step 4: Start ---
log "${YELLOW}[4/4]${NC} Container-ების გაშვება..." "START: docker compose up"

docker compose up -d 2>> "$LOG_FILE"

if [ $? -ne 0 ]; then
    log "${RED}[ERROR]${NC} გაშვება ვერ მოხერხდა!" "FAILED: docker compose up"
    exit 1
fi
log "${GREEN}[OK]${NC}    გაეშვა" "SUCCESS: containers started"

# --- Health Check ---
echo ""
echo "=========================================="
echo " Container Status:"
echo "=========================================="
docker compose ps
echo ""

echo "=========================================="
echo -e " ${GREEN}DEPLOY COMPLETE${NC} — $DATE"
echo "=========================================="

log "" "DONE: Deploy completed successfully"

გახადე გაშვებადი:
bashchmod +x ~/docker-app/deploy.sh


Git-ში დაამატე:
bashcd ~/docker-app
git add deploy.sh
git commit -m "Add deployment script"


k@devserver:~/docker-app$ nano ~/docker-app/deploy.sh
k@devserver:~/docker-app$ chmod +x ~/docker-app/deploy.sh
k@devserver:~/docker-app$ cd ~/docker-app
k@devserver:~/docker-app$ git add deploy.sh
k@devserver:~/docker-app$ git commit -m "Add deployment script"
[master 7b45374] Add deployment script
 1 file changed, 77 insertions(+)
 create mode 100755 deploy.sh
k@devserver:~/docker-app$ ~/docker-app/deploy.sh
==========================================
 Deploy Started — 2026-02-10 19:53:25
==========================================
[1/4] Git pull...
k@devserver:~/docker-app$

ხარვეზის გასწორება 

nano ~/docker-app/deploy.sh

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


გახადე executable:
chmod +x deploy.sh

გაუშვი:
./deploy.sh


k@devserver:~/docker-app$ chmod +x deploy.sh
k@devserver:~/docker-app$ ./deploy.sh
[2026-02-10 20:09:57] === DEPLOY STARTED ===
[2026-02-10 20:09:57] [1/4] Git pull...
[2026-02-10 20:09:57] [SKIP] Git remote არ არის
[2026-02-10 20:09:57] [OK] კოდი განახლდა
[2026-02-10 20:09:57] [2/4] Containers stopping...
[2026-02-10 20:09:57] [OK] გაჩერდა
[2026-02-10 20:09:57] [3/4] Pull & Build...
[2026-02-10 20:09:57] [OK] Build დასრულდა
[2026-02-10 20:09:57] [4/4] Starting containers...
[2026-02-10 20:09:57] [OK] გაეშვა

==========================================
 Container Status
==========================================
NAME                   IMAGE                COMMAND                  SERVICE   CREATED          STATUS                    PORTS
docker-app-adminer-1   adminer:latest       "entrypoint.sh docke…"   adminer   15 seconds ago   Up 7 seconds              0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp
docker-app-db-1        postgres:16-alpine   "docker-entrypoint.s…"   db        17 seconds ago   Up 10 seconds (healthy)   5432/tcp
docker-app-web-1       nginx:alpine         "/docker-entrypoint.…"   web       15 seconds ago   Up 2 seconds              0.0.0.0:8080->80/tcp, [::]:8080->80/tcp

[2026-02-10 20:09:57] === DEPLOY FINISHED ===
==========================================
 DEPLOY COMPLETE — 2026-02-10 20:09:57
==========================================
k@devserver:~/docker-app$


ლოგი ჩაიწერება:

~/docker-app/deploy.log

შეგიძლია ნახო:

tail -f ~/docker-app/deploy.log

k@devserver:~/docker-app$ tail -f ~/docker-app/deploy.log
 Container docker-app-db-1 Starting
 Container docker-app-db-1 Started
 Container docker-app-db-1 Waiting
 Container docker-app-adminer-1 Starting
 Container docker-app-adminer-1 Started
 Container docker-app-db-1 Healthy
 Container docker-app-web-1 Starting
 Container docker-app-web-1 Started
[2026-02-10 20:09:57] SUCCESS: containers started
[2026-02-10 20:09:57] DEPLOY SUCCESS
