# Task 2

Network configuration details.

2 ადაპტერი დაერთებულია virtual box ის VM მანქანის პარამეტრებში 1 NAT და 1 host only


ip a
ip link

systemctl status ssh
sudo apt update
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
sudo ufw status
sudo ufw allow ssh
sudo ufw allow 22


ინტერფეისები: lo, enp0s3 (ეს შენი NAT-ია) და  enp0s8

კონფიგურაციის ფაილის ხელით ცვლილება არ დამჭირვებია
sudo nano /etc/netplan/00-installer-config.yaml


yaml
network:
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      dhcp4: true
  version: 2

sudo netplan apply

IP მისამართებია

k@devserver:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:50:b7:a5 brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.101/24 metric 100 brd 192.168.56.255 scope global dynamic enp0s3
       valid_lft 449sec preferred_lft 449sec
    inet6 fe80::a00:27ff:fe50:b7a5/64 scope link
       valid_lft forever preferred_lft forever
3: enp0s8: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 08:00:27:68:db:93 brd ff:ff:ff:ff:ff:ff


k@devserver:~$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:50:b7:a5 brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 08:00:27:68:db:93 brd ff:ff:ff:ff:ff:ff


გასასტატიკურებლად შევცვლით კონფიგურაციას

Adapter 1 მითითებულია როგორც Host-Only, 
ხოლო Adapter 2 სავარაუდოდ NAT-ია.

network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
      addresses:
        - 192.168.56.101/24
    enp0s8:
      dhcp4: true
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]

"Failure in name resolution"
რომ ავირიდოთ ბარემ გავუწეროთ DNS ჯერ cloudflare და შემდეგ Google

sudo nano /etc/netplan/00-installer-config.yaml

გავწეროთ კონფიგურაციის ფაილზე უფლებები რომ ყველას არ ქონდეს წვდომა
sudo chmod 600 /etc/netplan/00-installer-config.yaml

თუ არ გინდა რომ გაფრთხილება მიიღო netplan ისგან
k@devserver:~$ sudo netplan apply

** (generate:4130): WARNING **: 15:14:37.183: Permissions for /etc/netplan/00-installer-config.yaml are too open. Netplan configuration should NOT be accessible by others.

** (process:4122): WARNING **: 15:14:38.157: Permissions for /etc/netplan/00-installer-config.yaml are too open. Netplan configuration should NOT be accessible by others.

** (process:4122): WARNING **: 15:14:38.494: Permissions for /etc/netplan/00-installer-config.yaml are too open. Netplan configuration should NOT be accessible by others.

გავპინგოთ კონფიგურაციის ფაილის შეცვლის შემდეგ ქსელზე გავდივართ თუ არა IP - ით

k@devserver:~$ ping -c 4 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=255 time=50.6 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=255 time=51.3 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=255 time=50.2 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=255 time=49.4 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3721ms
rtt min/avg/max/mdev = 49.442/50.365/51.276/0.665 ms

DNS

k@devserver:~$ ping -c 4 google.com
PING google.com (172.217.20.78) 56(84) bytes of data.
64 bytes from sof02s49-in-f14.1e100.net (172.217.20.78): icmp_seq=1 ttl=255 time=52.9 ms
64 bytes from sof02s49-in-f14.1e100.net (172.217.20.78): icmp_seq=2 ttl=255 time=50.9 ms
64 bytes from sof02s49-in-f14.1e100.net (172.217.20.78): icmp_seq=3 ttl=255 time=51.0 ms
64 bytes from sof02s49-in-f14.1e100.net (172.217.20.78): icmp_seq=4 ttl=255 time=51.3 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3711ms
rtt min/avg/max/mdev = 50.932/51.539/52.886/0.789 ms

k@devserver:~$ ping -c 4 1.1.1.1
PING 1.1.1.1 (1.1.1.1) 56(84) bytes of data.
64 bytes from 1.1.1.1: icmp_seq=1 ttl=255 time=40.2 ms
64 bytes from 1.1.1.1: icmp_seq=2 ttl=255 time=40.1 ms
64 bytes from 1.1.1.1: icmp_seq=3 ttl=255 time=40.7 ms
64 bytes from 1.1.1.1: icmp_seq=4 ttl=255 time=39.3 ms

^C
--- 1.1.1.1 ping statistics ---
9 packets transmitted, 9 received, 0% packet loss, time 11829ms
rtt min/avg/max/mdev = 38.988/40.371/43.464/1.390 ms
