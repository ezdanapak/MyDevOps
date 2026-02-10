
Automated Backup Script

სკრიპტის შექმნა პირდაპირ სერვერზე:
```bash
nano ~/db_backup.sh
```


#!/bin/bash
# ============================================
# PostgreSQL Automated Backup Script
# Database: kutaisi_db
# ============================================

# --- Configuration ---
DB_NAME="kutaisi_db"
DB_USER="kapo"
BACKUP_DIR="/home/$USER/backups"
RETENTION_DAYS=7
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE="${DB_NAME}_${DATE}"
LOG_FILE="${BACKUP_DIR}/backup.log"

# --- Colors ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "$1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $2" >> "$LOG_FILE"
}

# --- Create backup directory ---
mkdir -p "$BACKUP_DIR"

echo "=========================================="
echo " PostgreSQL Backup - ${DB_NAME}"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

# --- Step 1: Dump database ---
log "${YELLOW}[1/3]${NC} Database dump იქმნება..." "START: Dumping ${DB_NAME}"

pg_dump -U "$DB_USER" -h localhost "$DB_NAME" > "${BACKUP_DIR}/${BACKUP_FILE}.sql" 2>> "$LOG_FILE"

if [ $? -ne 0 ]; then
    log "${RED}[ERROR]${NC} Database dump ვერ შეიქმნა!" "FAILED: pg_dump error"
    exit 1
fi

log "${GREEN}[OK]${NC}    SQL dump მზადაა" "SUCCESS: SQL dump created"

# --- Step 2: Compress to tar.gz ---
log "${YELLOW}[2/3]${NC} tar.gz არქივი იქმნება..." "START: Compressing"

tar -czf "${BACKUP_DIR}/${BACKUP_FILE}.tar.gz" -C "$BACKUP_DIR" "${BACKUP_FILE}.sql" 2>> "$LOG_FILE"

if [ $? -ne 0 ]; then
    log "${RED}[ERROR]${NC} არქივის შექმნა ვერ მოხერხდა!" "FAILED: tar compression error"
    exit 1
fi

# Remove raw .sql file, keep only tar.gz
rm -f "${BACKUP_DIR}/${BACKUP_FILE}.sql"

FILESIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}.tar.gz" | cut -f1)
log "${GREEN}[OK]${NC}    არქივი მზადაა (${FILESIZE})" "SUCCESS: ${BACKUP_FILE}.tar.gz (${FILESIZE})"

# --- Step 3: Delete old backups ---
log "${YELLOW}[3/3]${NC} ძველი backup-ების წაშლა (${RETENTION_DAYS}+ დღე)..." "START: Cleanup"

DELETED=$(find "$BACKUP_DIR" -name "${DB_NAME}_*.tar.gz" -mtime +${RETENTION_DAYS} -print -delete | wc -l)

log "${GREEN}[OK]${NC}    ${DELETED} ძველი ფაილი წაიშალა" "SUCCESS: Deleted ${DELETED} old backups"

# --- Summary ---
echo ""
echo "=========================================="
echo -e " ${GREEN}BACKUP COMPLETE${NC}"
echo " ფაილი: ${BACKUP_DIR}/${BACKUP_FILE}.tar.gz"
echo " ზომა:  ${FILESIZE}"
echo "=========================================="

log "" "DONE: Backup completed successfully"

გაშვებადი რომ იყოს სკრიპტი:
bashchmod +x ~/db_backup.sh


pgpass ფაილი:

```bash
nano ~/.pgpass
```

იწერება ბაზის მომხმარებლის პაროლით ამ ფაილში:

localhost:5432:kutaisi_db:kapo:your_secure_password

chmod 600 ~/.pgpass

    ეს ფაილის უფლებებს (permissions) აყენებს — მხოლოდ შენ (owner) შეგიძლია წაკითხვა და ჩაწერა, სხვა არავის.
600 ნიშნავს:

6 (owner) → წაკითხვა + ჩაწერა
0 (group) → არაფერი
0 (others) → არაფერი

PostgreSQL ამას მოითხოვს — თუ .pgpass ფაილს სხვებიც კითხულობენ, pg_dump უარს იტყვის მის გამოყენებაზე უსაფრთხოების მიზეზით. შემოწმება შეგიძლია:
bashls -la ~/.pgpass
დაინახავ: -rw------- — ეს ნიშნავს რომ მხოლოდ owner-ს აქვს rw (read/write) უფლება.

სკრიპტის გაშვება

~/db_backup.sh

k@devserver:~$ bashnano ~/db_backup.sh
bashnano: command not found
k@devserver:~$ nano ~/db_backup.sh
k@devserver:~$
k@devserver:~$ nano ~/db_backup.sh
k@devserver:~$ chmod +x ~/db_backup.sh
k@devserver:~$ nano ~/.pgpass
k@devserver:~$ chmod 600 ~/.pgpass
k@devserver:~$ ~/db_backup.sh
==========================================
 PostgreSQL Backup - kutaisi_db
 2026-02-10 17:57:56
==========================================
[1/3] Database dump იქმნება...
[OK]    SQL dump მზადაა
[2/3] tar.gz არქივი იქმნება...
[OK]    არქივი მზადაა (4.0K)
[3/3] ძველი backup-ების წაშლა (7+ დღე)...
[OK]    0 ძველი ფაილი წაიშალა

==========================================
 BACKUP COMPLETE
 ფაილი: /home/k/backups/kutaisi_db_2026-02-10_17-57-56.tar.gz
 ზომა:  4.0K
==========================================
