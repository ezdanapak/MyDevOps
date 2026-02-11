Task 16 — Reverse Proxy Configuration


Nginx reverse proxy კონფიგურაცია:
bashsudo nano /etc/nginx/sites-available/docker-proxy


server {
    listen 80;
    server_name _;

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


ძველი default საიტის გათიშვა და ახლის ჩართვა:
bashsudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/docker-proxy /etc/nginx/sites-enabled/

კონფიგურაციის შემოწმება:
bashsudo nginx -t


k@devserver:~/docker-app$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

Nginx-ის გადატვირთვა:
sudo systemctl restart nginx


Docker app რომ გაშვებულია, შეამოწმე:
bashcd ~/docker-app
docker compose ps

k@devserver:~/docker-app$ cd ~/docker-app
k@devserver:~/docker-app$ docker compose ps
NAME                   IMAGE                COMMAND                  SERVICE   CREATED          STATUS                    PORTS
docker-app-adminer-1   adminer:latest       "entrypoint.sh docke…"   adminer   19 minutes ago   Up 19 minutes             0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp
docker-app-db-1        postgres:16-alpine   "docker-entrypoint.s…"   db        19 minutes ago   Up 19 minutes (healthy)   5432/tcp
docker-app-web-1       nginx:alpine         "/docker-entrypoint.…"   web       19 minutes ago   Up 19 minutes             0.0.0.0:8080->80/tcp, [::]:8080->80/tcp
k@devserver:~/docker-app$


ტესტ
curl http://localhost


k@devserver:~/docker-app$ curl http://localhost
<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker App</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            background: #1e293b;
            border-radius: 16px;
            padding: 2.5rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            text-align: center;
        }
        h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .emoji { font-size: 3rem; margin-bottom: 1rem; }
        .services {
            margin: 1.5rem 0;
            text-align: left;
        }
        .service {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.8rem 1rem;
            margin: 0.5rem 0;
            background: #0f172a;
            border-radius: 10px;
        }
        .dot {
            width: 12px; height: 12px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(34,197,94,0.5);
        }
        .btn {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.7rem 1.5rem;
            background: #3b82f6;
            color: #fff;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: background 0.2s;
        }
        .btn:hover { background: #2563eb; }
        .footer { margin-top: 1.5rem; font-size: 0.8rem; color: #64748b; }
    </style>
</head>
<body>
    <div class="card">
        <div class="emoji">🐳</div>
        <h1>Docker App Running!</h1>
        <p>Nginx + PostgreSQL + Adminer</p>

        <div class="services">
            <div class="service">
                <div class="dot"></div>
                <span><strong>Nginx</strong> — Web Server (port 8080)</span>
            </div>
            <div class="service">
                <div class="dot"></div>
                <span><strong>PostgreSQL 16</strong> — Database</span>
            </div>
            <div class="service">
                <div class="dot"></div>
                <span><strong>Adminer</strong> — DB Management</span>
            </div>
        </div>

        <a href="/adminer/" class="btn">Open Adminer (DB Panel)</a>

        <div class="footer">
            Task 15 — Containerized Application ✅
        </div>
    </div>
</body>
</html>
k@devserver:~/docker-app$

**7. Browser-ში:**
```
http://192.168.56.101/          → Docker web app ჩანს
http://192.168.56.101//adminer/ → Adminer DB panel ჩანს