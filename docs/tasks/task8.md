ვებ სერვერის ინსტალაცია



k@devserver:~$ sudo apt install nginx -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common
Suggested packages:
  fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  nginx nginx-common
0 upgraded, 2 newly installed, 0 to remove and 2 not upgraded.
Need to get 564 kB of archives.
After this operation, 1,596 kB of additional disk space will be used.
Get:1 http://ge.archive.ubuntu.com/ubuntu noble-updates/main amd64 nginx-common all 1.24.0-2ubuntu7.5 [43.4 kB]
Get:2 http://ge.archive.ubuntu.com/ubuntu noble-updates/main amd64 nginx amd64 1.24.0-2ubuntu7.5 [520 kB]
Fetched 564 kB in 1s (626 kB/s)
Preconfiguring packages ...
Selecting previously unselected package nginx-common.
(Reading database ... 87557 files and directories currently installed.)
Preparing to unpack .../nginx-common_1.24.0-2ubuntu7.5_all.deb ...
Unpacking nginx-common (1.24.0-2ubuntu7.5) ...
Selecting previously unselected package nginx.
Preparing to unpack .../nginx_1.24.0-2ubuntu7.5_amd64.deb ...
Unpacking nginx (1.24.0-2ubuntu7.5) ...
Setting up nginx-common (1.24.0-2ubuntu7.5) ...
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.
Setting up nginx (1.24.0-2ubuntu7.5) ...
 * Upgrading binary nginx                                                                                                                                                                              [ OK ]
Processing triggers for man-db (2.12.0-4build2) ...
Processing triggers for ufw (0.36.2-6) ...
Scanning processes...
Scanning candidates...
Scanning linux images...

Running kernel seems to be up-to-date.

Restarting services...

Service restarts being deferred:
 /etc/needrestart/restart.d/dbus.service
 systemctl restart getty@tty1.service
 systemctl restart systemd-logind.service
 systemctl restart unattended-upgrades.service

No containers need to be restarted.

User sessions running outdated binaries:
 k @ session #10: sshd[6338]
 k @ session #11: sshd[6340]
 k @ session #4: sshd[1039]
 k @ user manager service: systemd[1006]

No VM guests are running outdated hypervisor (qemu) binaries on this host.


სერვისის გაშვება ჩართვა და გადამოწმება

k@devserver:~$ sudo systemctl start nginx
k@devserver:~$ sudo systemctl enable nginx
Synchronizing state of nginx.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable nginx
k@devserver:~$ sudo systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Tue 2026-02-10 17:12:39 UTC; 1min 19s ago
       Docs: man:nginx(8)
   Main PID: 32513 (nginx)
      Tasks: 5 (limit: 9436)
     Memory: 3.7M (peak: 8.1M)
        CPU: 156ms
     CGroup: /system.slice/nginx.service
             ├─32513 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─32516 "nginx: worker process"
             ├─32517 "nginx: worker process"
             ├─32518 "nginx: worker process"
             └─32519 "nginx: worker process"

Feb 10 17:12:39 devserver systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
Feb 10 17:12:39 devserver systemd[1]: Started nginx.service - A high performance web server and a reverse proxy server.


Firewall-ში HTTP-ის დაშვება UFW ჩართულია:
bashsudo ufw allow 'Nginx HTTP'
sudo ufw status



ლოკალური ტესტი სერვერზევე:
```bash
curl http://localhost
```

k@devserver:~$ curl http://localhost
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>


http://192.168.56.101/

Welcome to nginx!
If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.