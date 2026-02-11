Disaster Recovery Test




Backup: მონაცემების დაარქივება (ძველ სერვერზე)ჩავთვალოთ, რომ გვაქვს სტანდარტული აპლიკაცია (მაგ. ვებ-საიტი), სადაც გვჭირდება ფაილები, კონფიგურაცია და მონაცემთა ბაზა.ა) კონფიგურაციების და ფაილების დაარქივებაგამოვიყენოთ tar ბრძანება, რომელიც შეკრავს /var/www/html (ფაილები) და /etc/nginx (კონფიგურაცია) ერთ არქივში:Bashsudo tar -cvzf full_backup.tar.gz /var/www/html /etc/nginx /etc/systemd/system/myapp.service
ბ) მონაცემთა ბაზის ექსპორტი (MySQL/MariaDB)გამოვიყენოთ mysqldump, რათა ბაზა ერთ .sql ფაილში გადავიტანოთ:Bashsudo mysqldump -u root -p my_database_name > db_backup.sql
2. Transfer: მონაცემების გადატანა ახალ VM-ზეგამოვიყენოთ scp (Secure Copy), რათა ფაილები ძველი სერვერიდან ახალზე გადავგზავნოთ:Bashscp full_backup.tar.gz db_backup.sql username@NEW_SERVER_IP:/home/username/
3. Restore: აღდგენა (ახალ VM-ზე)ახლა გადავინაცვლოთ ახალ სერვერზე და დავიწყოთ "რეანიმაცია".ა) ფაილების აღდგენაგავშალოთ არქივი თავის ადგილებზე:Bashsudo tar -xvzf full_backup.tar.gz -C /
(შენიშვნა: -C / ნიშნავს, რომ ფაილები თავის ორიგინალ გზებზე (მაგ. /etc/nginx) დალაგდება).ბ) მონაცემთა ბაზის იმპორტიჯერ შევქმნათ ცარიელი ბაზა და შემდეგ ჩავასხათ მონაცემები:Bashmysql -u root -p -e "CREATE DATABASE my_database_name;"
mysql -u root -p my_database_name < db_backup.sql
გ) სერვისების გადატვირთვარადგან კონფიგურაციები შევცვალეთ, სისტემამ უნდა დაინახოს ისინი:Bashsudo systemctl daemon-reload
sudo systemctl restart nginx
sudo systemctl restart myapp.service
4. შემოწმება (Verification)აღდგენის შემდეგ უნდა დავრწმუნდეთ, რომ ყველაფერი მუშაობს:პორტები: ss -tunlp (ნახე, ჩაირთო თუ არა საჭირო პორტები).ლოგები: journalctl -u nginx (ნახე, ხომ არ აქვს შეცდომები).ვები: ბრაუზერში გახსენი ახალი VM-ის IP.შედეგის დოკუმენტირება:კომპონენტისტატუსიმეთოდიFiles✅ აღდგენილიაTar archiveConfigs✅ აღდგენილიაTar extraction to /etcDatabase✅ აღდგენილიაMySQL dump/importApp Status✅ RunningSystemctl check


k@devserver:~$ sudo tar -cvzf full_backup.tar.gz /var/www/html /etc/nginx /etc/systemd/system/myapp.service
tar: Removing leading `/' from member names
/var/www/html/
/var/www/html/index.html
tar: Removing leading `/' from hard link targets
/var/www/html/index.nginx-debian.html
/etc/nginx/
/etc/nginx/modules-enabled/
/etc/nginx/uwsgi_params
/etc/nginx/mime.types
/etc/nginx/sites-enabled/
/etc/nginx/sites-enabled/docker-proxy
/etc/nginx/sites-available/
/etc/nginx/sites-available/default
/etc/nginx/sites-available/docker-proxy
/etc/nginx/snippets/
/etc/nginx/snippets/snakeoil.conf
/etc/nginx/snippets/fastcgi-php.conf
/etc/nginx/scgi_params
/etc/nginx/ssl/
/etc/nginx/ssl/server.crt
/etc/nginx/ssl/server.key
/etc/nginx/modules-available/
/etc/nginx/fastcgi_params
/etc/nginx/koi-utf
/etc/nginx/nginx.conf
/etc/nginx/koi-win
/etc/nginx/win-utf
/etc/nginx/fastcgi.conf
/etc/nginx/proxy_params
/etc/nginx/conf.d/
tar: /etc/systemd/system/myapp.service: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors


PostgreSQL ბაზის Backup (ძველ სერვერზე)
Postgres-ში ვიყენებთ pg_dump ბრძანებას. ის ქმნის SQL ფაილს, რომელიც შეიცავს ბაზის აღდგენის ყველა ინსტრუქციას.

Bash
sudo -u postgres pg_dump database_name > db_backup.sql
-u postgres: ბრძანებას ვუშვებთ postgres მომხმარებლის სახელით.

database_name: ჩაწერე შენი ბაზის რეალური სახელი.

თუ გსურს ყველა ბაზის, როლების და კონფიგურაციის ერთდროულად დაარქივება:

Bash
sudo -u postgres pg_dumpall > full_postgres_backup.sql

k@devserver:~$ sudo -u postgres pg_dump kutaisi_db > db_backup.sql
sudo -u postgres pg_dumpall > full_postgres_backup.sql