Task 18 — Git Repository Setup

Git-ის კონფიგურაცია (თუ პირველად იყენებ):
bashgit config --global user.name "kapanadze"
git config --global user.email "kapan.gio777@gmail.com"



k@devserver:~/docker-app$ git config --global user.name "kapanadze"
k@devserver:~/docker-app$ git config --global user.email "kapan.gio777@gmail.com"
k@devserver:~/docker-app$ cd ~/docker-app
k@devserver:~/docker-app$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
Initialized empty Git repository in /home/k/docker-app/.git/


git config --global init.defaultBranch main



2. პროექტის ფოლდერში შესვლა და repo-ს ინიციალიზაცია:
bashcd ~/docker-app
git init
3. .gitignore შექმნა:
bashnano .gitignore
```

ჩასვი:
```
.env
*.log
pgdata/

k@devserver:~/docker-app$ nano .gitignore





ფაილების დამატება და initial commit:
bashgit add .
git status
git commit -m "Initial commit: Nginx + PostgreSQL + Adminer docker-compose app"

k@devserver:~/docker-app$ git add .
k@devserver:~/docker-app$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   docker-compose.yml
        new file:   nginx/index.html
        new file:   nginx/nginx.conf

k@devserver:~/docker-app$ git commit -m "Initial commit: Nginx + PostgreSQL + Adminer docker-compose app"
[master (root-commit) b7555e1] Initial commit: Nginx + PostgreSQL + Adminer docker-compose app
 4 files changed, 147 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 docker-compose.yml
 create mode 100644 nginx/index.html
 create mode 100644 nginx/nginx.conf




5. შემოწმება:
bashgit log
```
k@devserver:~/docker-app$ git log
commit b7555e19618a377c98b79c7203013bb54095725a (HEAD -> master)
Author: kapanadze <kapan.gio777@gmail.com>
Date:   Tue Feb 10 19:46:32 2026 +0000

    Initial commit: Nginx + PostgreSQL + Adminer docker-compose app


დაინახავ:
```
commit abc123... (HEAD -> master)
Author: Kapo <your@email.com>
Date:   Tue Feb 10 ...

    Initial commit: Nginx + PostgreSQL + Adminer docker-compose app
6. რა ფაილებია repo-ში:
bashgit ls-files
```
```


.gitignore
docker-compose.yml
nginx/index.html
nginx/nginx.conf

k@devserver:~/docker-app$ git ls-files
.gitignore
docker-compose.yml
nginx/index.html
nginx/nginx.conf
