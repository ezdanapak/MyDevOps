

პორტების გახსნა

SSH (პორტი 22): sudo ufw allow ssh (ან sudo ufw allow 22/tcp)

HTTP (პორტი 80): sudo ufw allow http (ან sudo ufw allow 80/tcp)

HTTPS (პორტი 443): sudo ufw allow https (ან sudo ufw allow 443/tcp)

k@devserver:~$ sudo ufw allow ssh
Rules updated
Rules updated (v6)
k@devserver:~$ sudo ufw allow http
Rules updated
Rules updated (v6)
k@devserver:~$ sudo ufw allow https
Rules updated
Rules updated (v6)

k@devserver:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? Y
Firewall is active and enabled on system startup

k@devserver:~$ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443                        ALLOW IN    Anywhere
22/tcp (v6)                ALLOW IN    Anywhere (v6)
80/tcp (v6)                ALLOW IN    Anywhere (v6)
443 (v6)                   ALLOW IN    Anywhere (v6)

k@devserver:~$

რას ნიშნავს
Deny incoming: ყველაფერი, რაც შენს სერვერზე შემოდის და არ არის პორტი 22, 80 ან 443, ავტომატურად დაიბლოკება.

Allow outgoing: შენს სერვერს შეუძლია ნებისმიერ პორტზე გავიდეს გარეთ (მაგალითად, განახლებების გადმოსაწერად).