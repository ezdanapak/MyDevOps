# 🚀 MyDevOps Journey: From Zero to Production

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-mkdocs-blue.svg)](https://www.mkdocs.org/)
[![Tasks](https://img.shields.io/badge/tasks-27%2F27-success.svg)](docs/)

კეთილი იყოს თქვენი მობრძანება **MyDevOps** რეპოზიტორიაში! ეს არის სრული, პრაქტიკული გზამკვლევი DevOps-ის სამყაროში - **27 Task-ით**, რომელიც გადის პირველადი VM setup-იდან დაწყებული, სრულფასოვანი, უსაფრთხო, მონიტორინგებადი და ავტომატიზებული ინფრასტრუქტურით დამთავრებული.

თითოეული Task დოკუმენტირებულია დეტალურად, ყველა ბრძანებით, კონფიგურაციით, სკრიპტით და troubleshooting ტიპებით. ეს არ არის მხოლოდ თეორიული მასალა - ეს არის რეალური, ხელით გაკეთებული, დატესტილი და მუშა სისტემის სრული აღწერა.

---

## 📋 DevOps Journey: 27 Tasks

პროექტი 27 Task-ად არის დაყოფილი, რომლებიც ლოგიკურად მიჰყვება DevOps პრინციპებს:

### 🔷 Phase 1: Infrastructure Foundation (Tasks 1-7)
**ვირტუალური მანქანის დაყენება და საბაზისო უსაფრთხოება**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 1 | Virtual Machine | Ubuntu Server-ის ინსტალაცია VirtualBox-ში |
| 2 | Network Setup | NAT + Host-Only network კონფიგურაცია |
| 3 | Static IP | სტატიკური IP მისამართის მინიჭება |
| 4 | SSH Configuration | SSH key authentication-ის დაყენება |
| 5 | System Update | პაკეტების განახლება და საჭირო tools-ების ინსტალაცია |
| 6 | User Management | developer და deploy user-ების შექმნა |
| 7 | Firewall Setup | UFW firewall-ის კონფიგურაცია |

### 🔷 Phase 2: Web Infrastructure (Tasks 8-10)
**ვებ სერვერი და ბაზის დაყენება**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 8 | Web Server | Nginx-ის ინსტალაცია და გამართვა |
| 9 | Custom Website | HTML website-ის deploy |
| 10 | Database | MySQL/PostgreSQL ინსტალაცია და კონფიგურაცია |

### 🔷 Phase 3: Automation & Monitoring (Tasks 11-13)
**ავტომატიზაცია და ლოგების მონიტორინგი**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 11 | Backup Script | Database backup ავტომატიზაციის სკრიპტი |
| 12 | Cron Automation | Cron job-ით ავტომატური backup-ების დაგეგმვა |
| 13 | Log Monitoring | System logs-ის ანალიზი და მონიტორინგი |

### 🔷 Phase 4: Containerization (Tasks 14-17)
**Docker და კონტეინერიზაცია**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 14 | Docker Installation | Docker და Docker Compose ინსტალაცია |
| 15 | Containerized App | Web application-ის გაშვება Docker-ში |
| 16 | Reverse Proxy | Nginx reverse proxy Docker container-ისთვის |
| 17 | SSL Certificate | HTTPS კონფიგურაცია self-signed certificate-ით |

### 🔷 Phase 5: DevOps Practices (Tasks 18-19)
**Version Control და Deployment**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 18 | Git Repository | Git version control-ის დაყენება |
| 19 | Deployment Script | ავტომატური deployment სკრიპტი |

### 🔷 Phase 6: System Operations (Tasks 20-23)
**სისტემის მართვა და უსაფრთხოება**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 20 | Resource Monitoring | CPU/RAM/Disk მონიტორინგის tools |
| 21 | Disk Management | Disk space-ის ოპტიმიზაცია |
| 22 | Network Diagnostics | Network connections და ports ანალიზი |
| 23 | Security Audit | უსაფრთხოების შემოწმება და დოკუმენტირება |

### 🔷 Phase 7: Production Readiness (Tasks 24-27)
**Production-ready სისტემა**

| Task | სახელი | მოკლე აღწერა |
|------|--------|--------------|
| 24 | Disaster Recovery | სრული backup და აღდგენის ტესტი |
| 25 | Performance Optimization | სისტემის ოპტიმიზაცია და tuning |
| 26 | Documentation | სრული დოკუმენტაციის მომზადება |
| 27 | Final Presentation | პროექტის პრეზენტაცია და ასახსნელი |

---

## 📂 რეპოზიტორიის სტრუქტურა

```
MyDevOps/
├── docs/                           # MkDocs დოკუმენტაცია
│   ├── index.md                   # მთავარი გვერდი
│   │
│   ├── phase1-infrastructure/     # Phase 1: Infrastructure
│   │   ├── task01-vm-setup.md
│   │   ├── task02-network.md
│   │   ├── task03-static-ip.md
│   │   ├── task04-ssh.md
│   │   ├── task05-system-update.md
│   │   ├── task06-users.md
│   │   └── task07-firewall.md
│   │
│   ├── phase2-web/                # Phase 2: Web Infrastructure
│   │   ├── task08-nginx.md
│   │   ├── task09-website.md
│   │   └── task10-database.md
│   │
│   ├── phase3-automation/         # Phase 3: Automation
│   │   ├── task11-backup.md
│   │   ├── task12-cron.md
│   │   └── task13-logs.md
│   │
│   ├── phase4-containers/         # Phase 4: Containerization
│   │   ├── task14-docker.md
│   │   ├── task15-app-container.md
│   │   ├── task16-reverse-proxy.md
│   │   └── task17-ssl.md
│   │
│   ├── phase5-devops/            # Phase 5: DevOps Practices
│   │   ├── task18-git.md
│   │   └── task19-deployment.md
│   │
│   ├── phase6-operations/        # Phase 6: Operations
│   │   ├── task20-monitoring.md
│   │   ├── task21-disk.md
│   │   ├── task22-network-diag.md
│   │   └── task23-security.md
│   │
│   └── phase7-production/        # Phase 7: Production
│       ├── task24-disaster-recovery.md
│       ├── task25-optimization.md
│       ├── task26-documentation.md
│       └── task27-presentation.md
│
├── scripts/                       # ავტომატიზაციის სკრიპტები
│   ├── backup/
│   │   ├── db_backup.sh          # Database backup script
│   │   └── full_backup.sh        # სრული სისტემის backup
│   ├── deployment/
│   │   ├── deploy.sh             # Auto deployment script
│   │   └── rollback.sh           # Rollback script
│   ├── monitoring/
│   │   ├── check_resources.sh    # Resource checker
│   │   └── log_analyzer.py       # Log analysis tool
│   └── maintenance/
│       ├── cleanup.sh            # Disk cleanup script
│       └── update_system.sh      # System update automation
│
├── configs/                       # კონფიგურაციის ფაილები
│   ├── nginx/
│   │   ├── nginx.conf            # Main Nginx config
│   │   ├── sites-available/      # Virtual hosts
│   │   └── ssl/                  # SSL certificates
│   ├── docker/
│   │   ├── docker-compose.yml    # Docker compose file
│   │   └── Dockerfile            # Custom Docker images
│   ├── systemd/
│   │   └── custom-services/      # Custom systemd services
│   ├── cron/
│   │   └── crontab-backup        # Cron job definitions
│   └── network/
│       └── netplan/              # Network configurations
│
├── logs/                          # ლოგების samples და analysis
│   ├── analysis/                 # Log analysis results
│   └── samples/                  # Sample log files
│
├── mkdocs.yml                     # MkDocs კონფიგურაცია
├── LICENSE                        # MIT License
└── README.md                      # ეს ფაილი
```

---

## ⚡ სწრაფი დაწყება

### 🎯 როგორ გამოვიყენო ეს რეპოზიტორია?

**1. დოკუმენტაციის დათვალიერება:**

```bash
# რეპოზიტორიის კლონირება
git clone https://github.com/yourusername/MyDevOps.git
cd MyDevOps

# Python virtual environment (რეკომენდებული)
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# MkDocs-ის ინსტალაცია
pip install mkdocs mkdocs-material

# დოკუმენტაციის ლოკალურად გაშვება
mkdocs serve
```

🌐 დოკუმენტაცია ხელმისაწვდომი იქნება: **http://127.0.0.1:8000**

**2. თითოეული Task-ის დეტალები:**

თითოეული task-ის markdown ფაილში გაწერილია:
- ✅ **დავალების აღწერა** - რას აკეთებს
- 🔧 **საჭირო tools** - რა პროგრამები დაგჭირდება
- 📝 **ბრძანებები** - ზუსტი terminal commands
- 📋 **კონფიგურაციები** - config ფაილების მაგალითები
- 🐛 **Troubleshooting** - რა პრობლემები შეიძლება შეგხვდეს
- ✨ **შედეგი** - როგორ გამოიყურება წარმატებული შედეგი

**3. სკრიპტების გამოყენება:**

```bash
# Execution უფლების მიცემა
chmod +x scripts/**/*.sh

# Backup script-ის გაშვება
./scripts/backup/db_backup.sh

# Deployment automation
./scripts/deployment/deploy.sh

# Log analysis
python3 scripts/monitoring/log_analyzer.py
```

---

## 🔧 ძირითადი ბრძანებები Phase-ების მიხედვით

### 📡 Phase 1: Infrastructure & Network

```bash
# Network adapter-ების შემოწმება
ip addr show

# Static IP კონფიგურაცია (netplan)
sudo nano /etc/netplan/01-netcfg.yaml
sudo netplan apply

# SSH-ით connection
ssh -i ~/.ssh/vm_key user@192.168.56.10

# Firewall status
sudo ufw status verbose
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 🌐 Phase 2: Web Server & Database

```bash
# Nginx სტატუსი და მართვა
sudo systemctl status nginx
sudo systemctl restart nginx
sudo nginx -t  # config ტესტი

# Database connection test
mysql -u dbuser -p mydatabase
# ან PostgreSQL-ისთვის
psql -U dbuser -d mydatabase

# Website files
sudo cp -r /path/to/website/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

### ⚙️ Phase 3: Automation & Logs

```bash
# Crontab რედაქტირება
crontab -e
# მაგალითი: 0 3 * * * /path/to/backup.sh

# ლოგების ნახვა
tail -f /var/log/nginx/access.log
grep "error" /var/log/nginx/error.log
journalctl -u nginx -f

# Failed login attempts
sudo grep "Failed password" /var/log/auth.log | tail -50

# Sudo commands history
sudo grep "sudo" /var/log/auth.log | tail -20
```

### 🐳 Phase 4: Docker & Containers

```bash
# Docker კონტეინერები
docker ps -a
docker logs container_name
docker exec -it container_name bash

# Docker Compose
docker-compose up -d
docker-compose ps
docker-compose logs -f
docker-compose down

# Nginx Reverse Proxy config test
docker exec nginx nginx -t
```

### 🚀 Phase 5: Git & Deployment

```bash
# Git operations
git status
git add .
git commit -m "Update: description"
git push origin main

# Deployment workflow
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
```

### 📊 Phase 6: Monitoring & Maintenance

```bash
# Resource monitoring
htop
glances
df -h  # disk space
du -sh /var/* | sort -rh | head -10

# Network diagnostics
ss -tulpn  # active ports
netstat -tulpn  # alternative
nmap localhost

# Disk cleanup
find /var/log -name "*.log" -mtime +30 -delete
sudo apt autoremove
sudo apt autoclean
```

### 🔐 Phase 7: Security & Backup

```bash
# Security audit
sudo grep -E '^sudo:' /etc/group
cat /etc/passwd | grep -E '/bin/(bash|sh)'
sudo fail2ban-client status

# Full system backup
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz \
  /etc /var/www /home/user

# Database backup
mysqldump -u root -p database_name > backup.sql
# აღდგენა:
mysql -u root -p database_name < backup.sql
```

---

## 🤖 სკრიპტები და ავტომატიზაცია

პროექტში შექმნილია სასარგებლო სკრიპტები, რომლებიც დოკუმენტირებულია შესაბამის Task-ებში:

### 📦 Database Backup (Task 11)
```bash
./scripts/backup/db_backup.sh
```
**რას აკეთებს:**
- ქმნის database dump-ს
- კომპრესირებას უკეთებს tar.gz ფორმატში
- timestamp-ს უმატებს ფაილის სახელს
- ინახავს backup_folder-ში

**მაგალითი გამოსავალი:**
```
backup_20240211_153045.tar.gz
```

### 🔄 Auto Deployment (Task 19)
```bash
./scripts/deployment/deploy.sh
```
**ნაბიჯები:**
1. `git pull origin main` - ახალი კოდის მიღება
2. `docker-compose build` - containers-ის rebuild
3. `docker-compose down` - ძველი კონტეინერების გათიშვა
4. `docker-compose up -d` - ახალი კონტეინერების გაშვება
5. Health check და notification

### 📊 Log Analyzer (Task 13)
```bash
python3 scripts/monitoring/log_analyzer.py
```
**ფუნქციონალი:**
- ფილტრავს 404, 500 errors
- ითვლის requests per IP
- აჩვენებს top 10 visited pages
- აგენერირებს daily/weekly რეპორტს

### 🧹 Disk Cleanup (Task 21)
```bash
./scripts/maintenance/cleanup.sh
```
**ოპერაციები:**
- წაშლის 30+ დღის ძველ ლოგებს
- გასუფთავებს apt cache
- წაშლის unused packages
- ათავისუფლებს disk space

### 🔐 Security Audit (Task 23)
```bash
./scripts/security/audit.sh
```
**შემოწმებები:**
- sudo users სია
- failed login attempts
- open ports
- firewall status
- fail2ban status

**შენიშვნა:** სკრიპტების გასაშვებად საჭიროა execution permission:
```bash
chmod +x scripts/**/*.sh
chmod +x scripts/**/*.py
```

---

## 📖 სრული დოკუმენტაცია

თითოეული Task-ის დეტალური აღწერა ხელმისაწვდომია MkDocs დოკუმენტაციაში. თითოეულ გვერდზე იპოვით:

### 📚 რას მოიცავს თითოეული Task-ის დოკუმენტაცია:

#### 🎯 **Task-ის მიზანი**
რას აკეთებთ და რატომ არის ეს მნიშვნელოვანი

#### 🛠 **პრერეკვიზიტები**
რა უნდა იყოს უკვე გაკეთებული ამ Task-ის დაწყებამდე

#### 📝 **Step-by-Step ინსტრუქციები**
ზუსტი ბრძანებები და კონფიგურაციები:
```bash
# მაგალითი ბრძანება
sudo apt update && sudo apt upgrade -y
```

#### 📋 **კონფიგურაციის ფაილები**
სრული config ფაილები კომენტარებით:
```nginx
# მაგალითი Nginx config
server {
    listen 80;
    server_name example.com;
    # ...
}
```

#### ✅ **ვერიფიკაცია**
როგორ გადაამოწმოთ, რომ ყველაფერი მუშაობს

#### 🐛 **Troubleshooting**
გავრცელებული პრობლემები და მათი გადაწყვეტა

#### 💡 **Best Practices**
რეკომენდაციები და გაუმჯობესების საშუალებები

### 📂 დოკუმენტაციის სტრუქტურა:

- **Phase 1-7 დირექტორიები**: თითოეულ phase-ში არის შესაბამისი tasks
- **task##-name.md**: თითოეული task ცალკე ფაილშია
- **კოდის ნიმუშები**: ყველა სკრიპტი და config
- **სქრინშოტები**: ვიზუალური გაიდები სადაც საჭიროა

### 🔗 სწრაფი ლინკები Task-ების კატეგორიებზე:

**Infrastructure**: Tasks 1-7 - სისტემის საფუძველი  
**Web Stack**: Tasks 8-10 - ვებ სერვერი და DB  
**Automation**: Tasks 11-13 - სკრიპტები და მონიტორინგი  
**Containers**: Tasks 14-17 - Docker და კონტეინერიზაცია  
**DevOps**: Tasks 18-19 - Git და deployment  
**Operations**: Tasks 20-23 - სისტემის მართვა  
**Production**: Tasks 24-27 - სრულყოფილება  

---

## 🎯 რისთვის არის ეს პროექტი?

### 👨‍🎓 **სტუდენტებისთვის**
- DevOps პრინციპების პრაქტიკული სწავლება
- ხელით გამოცდილება real-world scenario-ებზე
- Portfolio project-ი CV-სთვის
- Interview-ებისთვის მომზადება (Task 27)

### 💼 **დეველოპერებისთვის**
- Infrastructure as Code გაცნობა
- CI/CD პროცესების გაგება
- Production deployment workflow
- Docker და containerization პრაქტიკა

### 🔧 **System Administrator-ებისთვის**
- Infrastructure დოკუმენტაციის template
- Automation და scripting მაგალითები
- Security best practices
- Disaster recovery სცენარები

### 📚 **ინსტრუქტორებისთვის**
- სასწავლო კურსის სტრუქტურა
- პრაქტიკული დავალებები
- Hands-on labs-ების მასალა
- Real-world case studies

### 🚀 **ჩემთვის (და შენთვის!)**
- ცოდნის სისტემატიზაცია და დოკუმენტირება
- სწავლის პროცესის ჩაწერა (learning log)
- საცნობარო მასალა მომავალი პროექტებისთვის
- Open source contribution-ის დასაწყისი

---

## 📚 რას ისწავლი ამ პროექტით?

### 🏗️ **Infrastructure Skills**
✓ ვირტუალური მანქანების დაყენება და კონფიგურაცია  
✓ Network-ის გამართვა და troubleshooting  
✓ Static IP და DNS კონფიგურაცია  
✓ SSH-ის უსაფრთხო დაყენება  

### 🌐 **Web Server & Database**
✓ Nginx ინსტალაცია და ოპტიმიზაცია  
✓ Reverse proxy კონფიგურაცია  
✓ MySQL/PostgreSQL მართვა  
✓ SSL/TLS certificate-ების გამოყენება  

### 🤖 **Automation & Scripting**
✓ Bash scripting პრაქტიკა  
✓ Python automation tools  
✓ Cron jobs დაგეგმვა  
✓ Systemd services შექმნა  

### 🐳 **Containerization**
✓ Docker-ის გამოყენება  
✓ Docker Compose multi-container apps  
✓ Container networking  
✓ Volume management  

### 🔐 **Security & Compliance**
✓ Firewall (UFW) კონფიგურაცია  
✓ Fail2Ban intrusion prevention  
✓ User და permission management  
✓ Security audit practices  

### 📊 **Monitoring & Logging**
✓ System logs-ის ანალიზი  
✓ Resource monitoring tools  
✓ Log rotation და archiving  
✓ Performance troubleshooting  

### 🔄 **DevOps Practices**
✓ Git version control  
✓ Automated deployment  
✓ Backup & disaster recovery  
✓ Documentation writing  

---

## 🛠 გამოყენებული ტექნოლოგიები

### 💻 Infrastructure & OS
- **Virtualization**: VirtualBox
- **Operating System**: Ubuntu Server 22.04 LTS
- **Networking**: NAT, Host-Only Adapter, Static IP

### 🌐 Web Stack
- **Web Server**: Nginx 1.18+
- **Database**: MySQL 8.0 / PostgreSQL 14+
- **SSL/TLS**: Self-signed certificates, OpenSSL

### 🐳 Containerization
- **Container Runtime**: Docker 24+
- **Orchestration**: Docker Compose v2
- **Images**: nginx, mysql, custom apps

### ⚙️ Automation & Scripting
- **Shell**: Bash 5.0+
- **Programming**: Python 3.10+
- **Task Scheduling**: Cron, Systemd timers

### 🔐 Security
- **Firewall**: UFW (Uncomplicated Firewall)
- **SSH**: OpenSSH with key-based authentication
- **Intrusion Prevention**: Fail2Ban
- **File Permissions**: chmod, chown, ACLs

### 📊 Monitoring & Logging
- **System Monitor**: htop, glances
- **Log Management**: journalctl, rsyslog
- **Disk Usage**: ncdu, du, df
- **Network**: netstat, ss, nmap

### 🔧 DevOps Tools
- **Version Control**: Git
- **Documentation**: MkDocs + Material Theme
- **Reverse Proxy**: Nginx (for containers)
- **Package Management**: apt, pip

### 📦 Utilities
- **Text Editors**: vim, nano
- **File Transfer**: scp, rsync
- **Compression**: tar, gzip
- **Network Tools**: curl, wget, net-tools

---

## 🏆 საბოლოო არქიტექტურა

27 Task-ის გავლის შემდეგ მიიღებთ სრულფასოვან, production-ready სისტემას:

```
┌─────────────────────────────────────────────────────────────┐
│                    Host Machine (Your PC)                    │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          VirtualBox Virtual Machine (Ubuntu)           │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │  Firewall (UFW)                                 │   │ │
│  │  │  Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)        │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  │                      ↓                                  │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │  Nginx (Reverse Proxy + Web Server)            │   │ │
│  │  │  - SSL/TLS Termination                          │   │ │
│  │  │  - Load Balancing                               │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  │                      ↓                                  │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │  Docker Containers                              │   │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │ │
│  │  │  │ Web App  │  │   API    │  │ Database │      │   │ │
│  │  │  │ (nginx)  │  │ (Python) │  │  (MySQL) │      │   │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘      │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │  Automation & Monitoring                        │   │ │
│  │  │  - Cron Jobs (Backups 3:00 AM)                  │   │ │
│  │  │  - Log Rotation                                 │   │ │
│  │  │  - Resource Monitoring (htop/glances)           │   │ │
│  │  │  - Fail2Ban (Security)                          │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐   │ │
│  │  │  Git Repository                                 │   │ │
│  │  │  - Version Control                              │   │ │
│  │  │  - Deployment Scripts                           │   │ │
│  │  └─────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 ძირითადი კომპონენტები:

- **🖥 Virtual Machine**: Ubuntu Server 22.04 LTS
- **🌐 Web Server**: Nginx (reverse proxy + static content)
- **🐳 Docker**: Containerized applications
- **💾 Database**: MySQL/PostgreSQL in container
- **🔐 Security**: UFW firewall + Fail2Ban + SSH keys
- **🤖 Automation**: Bash/Python scripts + Cron
- **📊 Monitoring**: System logs + Resource tracking
- **🔄 DevOps**: Git + Automated deployment
- **💾 Backup**: Daily automated backups
- **📖 Documentation**: MkDocs website

### ✨ სისტემის მახასიათებლები:

✅ **მაღალი ხელმისაწვდომობა** - Reverse proxy და containerization  
✅ **უსაფრთხოება** - Multi-layer security (firewall, fail2ban, SSL)  
✅ **ავტომატიზაცია** - Scripted backups და deployments  
✅ **მონიტორინგი** - Real-time logs და resource tracking  
✅ **მასშტაბირებადობა** - Docker-based architecture  
✅ **აღდგენადობა** - Automated backup და tested recovery  

---

## 🤝 წვლილის შეტანა

თუ გსურთ პროექტის გაუმჯობესება:

1. Fork-ი გააკეთეთ repository-ს
2. შექმენით feature branch (`git checkout -b feature/amazing-feature`)
3. Commit გააკეთეთ ცვლილებებს (`git commit -m 'Add amazing feature'`)
4. Push გააკეთეთ branch-ზე (`git push origin feature/amazing-feature`)
5. გახსენით Pull Request

---

## 📝 ლიცენზია

ეს პროექტი ვრცელდება [MIT License](LICENSE) ქვეშ - იხილეთ LICENSE ფაილი დეტალებისთვის.

---

## 📧 კონტაქტი

თუ გაქვთ შეკითხვები ან წინადადებები, შეგიძლიათ:
- გახსნათ Issue ამ repository-ში
- დამიკავშირდეთ ელფოსტით

---

## 🙏 მადლობა

სპეციალური მადლობა DevOps community-ს და open source წვლილის შემომტან ყველას, ვინც აზიარებს ცოდნას და ხელმისაწვდომს ხდის სწავლას.

---

**Happy DevOps-ing! 🚀**