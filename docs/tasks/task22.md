Task 22 — Network Diagnostics

🔍 Listening Ports — ღია პორტების ნახვა

იმისთვის, რომ ნახო რომელი სერვისი ელოდება კავშირს
(მაგალითად: SSH → 22, Netdata → 19999), გამოიყენე ss ბრძანება
(netstat-ის თანამედროვე და სწრაფი ალტერნატივა):

sudo ss -tunlp

📖 ფლაგების განმარტება

-t — TCP კავშირები

-u — UDP კავშირები

-n — ციფრული მისამართები (პორტის ნომრები)

-l — მხოლოდ Listening პორტები

-p — პროცესის სახელი და PID რომელიც ამ პორტს იყენებს

- აქტიური კავშირების ნახვა (Active Connections)თუ გსურს ნახო, ვინ არის ამ წუთას შენს სერვერთან დაკავშირებული (მაგალითად, შენივე ბრაუზერი Netdata-ზე), გამოიყენე იგივე ბრძანება l (listening) ფლაგის გარეშე: <br>
```Bash
sudo ss -tunp
``` 
ეს გამოგიჩენს Established კავშირებს. სვეტში Foreign Address დაინახავ იმ კომპიუტერის IP-ს, რომელიც შენს სერვერს უკავშირდება.

- ალტერნატივა: lsof (List Open Files)Linux-ში "ყველაფერი ფაილია", მათ შორის ქსელური სოკეტებიც. lsof დაგეხმარება დაინახო, რომელ პროგრამას აქვს გახსნილი ინტერნეტ კავშირი:
```Bash
sudo lsof -i -P -n
```
-i: მხოლოდ ინტერნეტ (ქსელური) ფაილები.-P: პორტების ნომრებად ჩვენება (და არა სერვისის სახელებად).-n: IP მისამართების ჩვენება (DNS-ის გარეშე).

- netstat-ს გამოყენება (კლასიკური მეთოდი)ბევრი ადმინისტრატორი კვლავ იყენებს netstat-ს. თუ ის დაინსტალირებული გაქვს (sudo apt install net-tools), შეგიძლია გაუშვა:
```Bash
sudo netstat -plntu
```
შეჯამება დავალებისთვის:ბრძანებარას გვაჩვენებს?ss -tlpnრომელი სერვისები უსმენენ პორტებს (TCP).ss -tanაბსოლუტურად ყველა (Active + Listening) კავშირი.lsof -i :80კონკრეტულ პორტზე (მაგ. 80) რომელი პროცესი ზის.

```console
k@devserver:~$ sudo ss -tunlp
Netid State  Recv-Q Send-Q         Local Address:Port  Peer Address:PortProcess
udp   UNCONN 0      0                  127.0.0.1:8125       0.0.0.0:*    users:(("netdata",pid=147776,fd=57))
udp   UNCONN 0      0                 127.0.0.54:53         0.0.0.0:*    users:(("systemd-resolve",pid=18791,fd=16))
udp   UNCONN 0      0              127.0.0.53%lo:53         0.0.0.0:*    users:(("systemd-resolve",pid=18791,fd=14))
udp   UNCONN 0      0      192.168.56.101%enp0s3:68         0.0.0.0:*    users:(("systemd-network",pid=18146,fd=23))
udp   UNCONN 0      0           10.0.3.15%enp0s8:68         0.0.0.0:*    users:(("systemd-network",pid=18146,fd=26))
tcp   LISTEN 0      4096                 0.0.0.0:8080       0.0.0.0:*    users:(("docker-proxy",pid=110692,fd=8))
tcp   LISTEN 0      4096                 0.0.0.0:8081       0.0.0.0:*    users:(("docker-proxy",pid=110561,fd=8))
tcp   LISTEN 0      4096               127.0.0.1:8125       0.0.0.0:*    users:(("netdata",pid=147776,fd=61))
tcp   LISTEN 0      5                  127.0.0.1:61209      0.0.0.0:*    users:(("glances",pid=132757,fd=4))
tcp   LISTEN 0      4096                 0.0.0.0:19999      0.0.0.0:*    users:(("netdata",pid=147776,fd=6))
tcp   LISTEN 0      511                  0.0.0.0:443        0.0.0.0:*    users:(("nginx",pid=91368,fd=6),("nginx",pid=91367,fd=6),("nginx",pid=91366,fd=6),("nginx",pid=91365,fd=6),("nginx",pid=91364,fd=6))
tcp   LISTEN 0      128                127.0.0.1:4317       0.0.0.0:*    users:(("otel-plugin",pid=148292,fd=10))
tcp   LISTEN 0      4096           127.0.0.53%lo:53         0.0.0.0:*    users:(("systemd-resolve",pid=18791,fd=15))
tcp   LISTEN 0      4096                 0.0.0.0:22         0.0.0.0:*    users:(("sshd",pid=7361,fd=3),("systemd",pid=1,fd=225))
tcp   LISTEN 0      511                  0.0.0.0:80         0.0.0.0:*    users:(("nginx",pid=91368,fd=5),("nginx",pid=91367,fd=5),("nginx",pid=91366,fd=5),("nginx",pid=91365,fd=5),("nginx",pid=91364,fd=5))
tcp   LISTEN 0      4096              127.0.0.54:53         0.0.0.0:*    users:(("systemd-resolve",pid=18791,fd=17))
tcp   LISTEN 0      200                127.0.0.1:5432       0.0.0.0:*    users:(("postgres",pid=43966,fd=6))
tcp   LISTEN 0      128                127.0.0.1:6010       0.0.0.0:*    users:(("sshd",pid=123104,fd=8))
tcp   LISTEN 0      4096                    [::]:8080          [::]:*    users:(("docker-proxy",pid=110699,fd=8))
tcp   LISTEN 0      4096                    [::]:8081          [::]:*    users:(("docker-proxy",pid=110567,fd=8))
tcp   LISTEN 0      4096                    [::]:19999         [::]:*    users:(("netdata",pid=147776,fd=8))
tcp   LISTEN 0      4096                    [::]:22            [::]:*    users:(("sshd",pid=7361,fd=4),("systemd",pid=1,fd=227))
tcp   LISTEN 0      128                    [::1]:6010          [::]:*    users:(("sshd",pid=123104,fd=7))
```

🔗 Active Connections — აქტიური კავშირები

თუ გინდა ნახო ვინ არის ამჟამად დაკავშირებული სერვერთან:

აქტიური კავშირები
```console
k@devserver:~$ sudo ss -tunp
Netid          State          Recv-Q          Send-Q                    Local Address:Port                    Peer Address:Port           Process
tcp            ESTAB          0               0                        192.168.56.101:22                      192.168.56.1:63218           users:(("sshd",pid=34219,fd=4),("sshd",pid=34097,fd=4))
tcp            ESTAB          0               0                        192.168.56.101:22                      192.168.56.1:55940           users:(("sshd",pid=123173,fd=4),("sshd",pid=122987,fd=4))
tcp            ESTAB          0               0                        192.168.56.101:22                      192.168.56.1:55939           users:(("sshd",pid=123104,fd=4),("sshd",pid=122985,fd=4))
k@devserver:~$
```


📂 ალტერნატივა — lsof (List Open Files)

Linux-ში "ყველაფერი ფაილია", მათ შორის ქსელური სოკეტებიც.
```bash
sudo lsof -i -P -n
```
📖 ფლაგები

-i — მხოლოდ ქსელური ფაილები

-P — პორტების ნომრები

-n — DNS-ის გარეშე

```console
k@devserver:~$ sudo lsof -i -P -n
COMMAND      PID            USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
systemd        1            root  225u  IPv4   8390      0t0  TCP *:22 (LISTEN)
systemd        1            root  227u  IPv6   8392      0t0  TCP *:22 (LISTEN)
sshd        7361            root    3u  IPv4   8390      0t0  TCP *:22 (LISTEN)
sshd        7361            root    4u  IPv6   8392      0t0  TCP *:22 (LISTEN)
systemd-n  18146 systemd-network   23u  IPv4 410498      0t0  UDP 192.168.56.101:68
systemd-n  18146 systemd-network   26u  IPv4 156213      0t0  UDP 10.0.3.15:68
systemd-r  18791 systemd-resolve   14u  IPv4  27531      0t0  UDP 127.0.0.53:53
systemd-r  18791 systemd-resolve   15u  IPv4  27532      0t0  TCP 127.0.0.53:53 (LISTEN)
systemd-r  18791 systemd-resolve   16u  IPv4  27533      0t0  UDP 127.0.0.54:53
systemd-r  18791 systemd-resolve   17u  IPv4  27534      0t0  TCP 127.0.0.54:53 (LISTEN)
sshd       34097            root    4u  IPv4  51768      0t0  TCP 192.168.56.101:22->192.168.56.1:63218 (ESTABLISHED)
sshd       34219               k    4u  IPv4  51768      0t0  TCP 192.168.56.101:22->192.168.56.1:63218 (ESTABLISHED)
postgres   43966        postgres    6u  IPv4  63802      0t0  TCP 127.0.0.1:5432 (LISTEN)
nginx      91364            root    5u  IPv4 119330      0t0  TCP *:80 (LISTEN)
nginx      91364            root    6u  IPv4 119331      0t0  TCP *:443 (LISTEN)
nginx      91365        www-data    5u  IPv4 119330      0t0  TCP *:80 (LISTEN)
nginx      91365        www-data    6u  IPv4 119331      0t0  TCP *:443 (LISTEN)
nginx      91366        www-data    5u  IPv4 119330      0t0  TCP *:80 (LISTEN)
nginx      91366        www-data    6u  IPv4 119331      0t0  TCP *:443 (LISTEN)
nginx      91367        www-data    5u  IPv4 119330      0t0  TCP *:80 (LISTEN)
nginx      91367        www-data    6u  IPv4 119331      0t0  TCP *:443 (LISTEN)
nginx      91368        www-data    5u  IPv4 119330      0t0  TCP *:80 (LISTEN)
nginx      91368        www-data    6u  IPv4 119331      0t0  TCP *:443 (LISTEN)
docker-pr 110561            root    8u  IPv4 152359      0t0  TCP *:8081 (LISTEN)
docker-pr 110567            root    8u  IPv6 153741      0t0  TCP *:8081 (LISTEN)
docker-pr 110692            root    8u  IPv4 152486      0t0  TCP *:8080 (LISTEN)
docker-pr 110699            root    8u  IPv6 152487      0t0  TCP *:8080 (LISTEN)
sshd      122985            root    4u  IPv4 190143      0t0  TCP 192.168.56.101:22->192.168.56.1:55939 (ESTABLISHED)
sshd      122987            root    4u  IPv4 190156      0t0  TCP 192.168.56.101:22->192.168.56.1:55940 (ESTABLISHED)
sshd      123104               k    4u  IPv4 190143      0t0  TCP 192.168.56.101:22->192.168.56.1:55939 (ESTABLISHED)
sshd      123104               k    7u  IPv6 190988      0t0  TCP [::1]:6010 (LISTEN)
sshd      123104               k    8u  IPv4 190989      0t0  TCP 127.0.0.1:6010 (LISTEN)
sshd      123173               k    4u  IPv4 190156      0t0  TCP 192.168.56.101:22->192.168.56.1:55940 (ESTABLISHED)
glances   132757            root    4u  IPv4 209344      0t0  TCP 127.0.0.1:61209 (LISTEN)
netdata   147776         netdata    6u  IPv4 241528      0t0  TCP *:19999 (LISTEN)
netdata   147776         netdata    8u  IPv6 241529      0t0  TCP *:19999 (LISTEN)
netdata   147776         netdata   57u  IPv4 248938      0t0  UDP 127.0.0.1:8125
netdata   147776         netdata   61u  IPv4 248939      0t0  TCP 127.0.0.1:8125 (LISTEN)
otel-plug 148292         netdata   10u  IPv4 249003      0t0  TCP 127.0.0.1:4317 (LISTEN)
k@devserver:~$
```

📡 ალტერნატივა — netstat (კლასიკური მეთოდი)
```bash
sudo apt install net-tools
```
```bash
sudo netstat -plntu
```

ალტერნატივა netstat

```console
k@devserver:~$ sudo netstat -plntu
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      110692/docker-proxy
tcp        0      0 0.0.0.0:8081            0.0.0.0:*               LISTEN      110561/docker-proxy
tcp        0      0 127.0.0.1:8125          0.0.0.0:*               LISTEN      147776/netdata
tcp        0      0 127.0.0.1:61209         0.0.0.0:*               LISTEN      132757/python3
tcp        0      0 0.0.0.0:19999           0.0.0.0:*               LISTEN      147776/netdata
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      91364/nginx: master
tcp        0      0 127.0.0.1:4317          0.0.0.0:*               LISTEN      148292/otel-plugin
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      18791/systemd-resol
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1/systemd
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      91364/nginx: master
tcp        0      0 127.0.0.54:53           0.0.0.0:*               LISTEN      18791/systemd-resol
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN      43966/postgres
tcp        0      0 127.0.0.1:6010          0.0.0.0:*               LISTEN      123104/sshd: k@pts/
tcp6       0      0 :::8080                 :::*                    LISTEN      110699/docker-proxy
tcp6       0      0 :::8081                 :::*                    LISTEN      110567/docker-proxy
tcp6       0      0 :::19999                :::*                    LISTEN      147776/netdata
tcp6       0      0 :::22                   :::*                    LISTEN      1/systemd
tcp6       0      0 ::1:6010                :::*                    LISTEN      123104/sshd: k@pts/
udp        0      0 127.0.0.1:8125          0.0.0.0:*                           147776/netdata
udp        0      0 127.0.0.54:53           0.0.0.0:*                           18791/systemd-resol
udp        0      0 127.0.0.53:53           0.0.0.0:*                           18791/systemd-resol
udp        0      0 192.168.56.101:68       0.0.0.0:*                           18146/systemd-netwo
udp        0      0 10.0.3.15:68            0.0.0.0:*                           18146/systemd-netwo
k@devserver:~$
```