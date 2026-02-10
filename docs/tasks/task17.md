SSL Certificate

SSL სერტიფიკატის გენერაცია:

sudo mkdir -p /etc/nginx/ssl

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/server.key \
  -out /etc/nginx/ssl/server.crt \
  -subj "/C=GE/ST=Imereti/L=Kutaisi/O=DevServer/CN=devserver"

k@devserver:~/docker-app$ sudo mkdir -p /etc/nginx/ssl
k@devserver:~/docker-app$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/server.key \
  -out /etc/nginx/ssl/server.crt \
  -subj "/C=GE/ST=Imereti/L=Kutaisi/O=DevServer/CN=devserver"
...+...+.....+......+.+......+..+.+..+.......+...+.........+........+.+.....+....+...+...............+...+..+..........+..+...+....+.........+.....+.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*....+....+...........+....+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*..................+....+...........+.............+..+.........+.+..+..........+..+..........+.........+.....................+...........+....+......+.....+.......+...............+..+...............+..........+...+...+..+..........+...........+.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
...+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*..+....+..............+...+....+........+.+......+........+.+......+........+......+............+.............+......+...+........+...+.+...+...+............+.....+............+.+........+.+.....+................+...+..+............+.......+...+.....+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*...+........+.+..+...+.........................+...........+.+.........+.....+.........+....+....................+...+............+.......+...+.....+.+............+..+.+..+....+...........+...+......+.+...+..+.......+..+....+...........+....+......+......+..+.+..+.......+...+..+.+......+..............+............+...+...................+...+.........+.....+.........+.+...+............+...+..+....+.....+...............+....+...+.........+....................+...+...+.........+....+.....+..........+......+...+..+.........+.+...........+....+...+........+....+...+...+...+...........+...+............+...+..........+......+............+..+.............+.....+.......+..+...+..................+...+....+...+.....+..................+.......+..+......+....+...+........+.+..................+..................+...+..+.........+.+.....+.......+..+..........+........+.+..+...+.+.....+.+...+.....................+..............+....+...+...+..+......................+.....+...........................+...+.+.....+..........+......+.....+...+...+....+...+..+..................+.+.........+........+...............+...+......+....+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-----
k@devserver:~/docker-app$


Nginx კონფიგურაციის განახლება:
bashsudo nano /etc/nginx/sites-available/docker-proxy

server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name _;

    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /adminer/ {
        proxy_pass http://127.0.0.1:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

შემოწმება და რესტარტი:
k@devserver:~/docker-app$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
k@devserver:~/docker-app$

sudo systemctl restart nginx



Firewall-ში HTTPS-ის დაშვება:
bashsudo ufw allow 'Nginx Full'
sudo ufw status

k@devserver:~/docker-app$ sudo ufw allow 'Nginx Full'
Rule added
Rule added (v6)
k@devserver:~/docker-app$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443                        ALLOW       Anywhere
Nginx HTTP                 ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443 (v6)                   ALLOW       Anywhere (v6)
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)

k@devserver:~/docker-app$


ტესტი ტერმინალიდან:
bashcurl -k https://localhost
```

> `-k` flag self-signed სერტიფიკატს ენდობა

**6. Browser-ში:**
```
https://192.168.56.101/

Browser გაფრთხილებას აჩვენებს ("Your connection is not private") — ეს ნორმალურია self-signed სერტიფიკატისთვის. დააჭირე Advanced → Proceed (ან Accept the Risk).
ამის შემდეგ Docker app ჩანს HTTPS-ით, ხოლო http:// ავტომატურად გადამისამართდება https://-ზე — Task 17 ✅