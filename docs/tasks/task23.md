Task 23 — Security Audit


სისტემის მომხმარებლების სიაUbuntu-ში ყველა მომხმარებელი ინახება /etc/passwd ფაილში. იმისთვის, რომ დაინახო მხოლოდ რეალური მომხმარებლები (და არა სისტემური სერვისები), გამოიყენე ეს ბრძანება:Bashcolumn -t -s: /etc/passwd | awk '$3 >= 1000 && $3 != 65534 {print $1, "UID:"$3, "Shell:"$7}'
UID >= 1000: ჩვეულებრივ, რეალური მომხმარებლების ID იწყება 1000-დან.$1: მომხმარებლის სახელი.2. ვის აქვს Sudo (Root) უფლებები?ეს ყველაზე კრიტიკული ნაწილია. უნდა ვიცოდეთ, ვის შეუძლია სისტემური ცვლილებების შეტანა. შეამოწმე sudo ჯგუფის წევრები:Bashgrep '^sudo:.*$' /etc/group | cut -d: -f4
ასევე, გადახედე sudoers ფაილს, რომ ნახო, ხომ არ არის ვინმესთვის ინდივიდუალური უფლებები მინიჭებული:Bashsudo cat /etc/sudoers | grep -v '^#' | grep -v '^$'
3. Fail2Ban-ის შემოწმებაFail2Ban არის პროგრამა, რომელიც ბლოკავს IP მისამართებს, რომლებიც ბევრჯერ ცდილობენ არასწორი პაროლით შესვლას (Brute Force შეტევისგან დაცვა).შეამოწმე, დაინსტალირებულია თუ არა:Bashfail2ban-client --version
შეამოწმე, აქტიურია თუ არა სერვისი:Bashsudo systemctl status fail2ban
ნახე, რომელი "ციხეები" (jails) არის აქტიური (მაგ. sshd):Bashsudo fail2ban-client status
4. SSH-ის უსაფრთხოების შემოწმებადამატებითი აუდიტისთვის ნახე, დაშვებულია თუ არა root მომხმარებლით პირდაპირ შესვლა (რაც ცუდია უსაფრთხოებისთვის):Bashgrep "PermitRootLogin" /etc/ssh/sshd_config
რეკომენდაცია: უნდა იყოს PermitRootLogin no.5. სისტემის Security Status - შეჯამება (Report)შედეგი შეგიძლია ასე ჩამოწერო შენი დოკუმენტაციისთვის:პარამეტრისტატუსიშენიშვნაActive Usersadmin, sabaმხოლოდ საჭირო პირები.Sudo Accessadminკონტროლირებადია.Fail2BanActiveSSH დაცულია.Root SSH LoginDisabledუსაფრთხოა.Open Ports22, 80, 19999მხოლოდ საჭირო პორტები.ბონუსი: როგორ ვნახოთ ბოლო წარმატებული შესვლები?თუ გაინტერესებს, ვინ შევიდა ბოლოს სერვერზე:Bashlast -a | head -n 10


k@devserver:~$ column -t -s: /etc/passwd | awk '$3 >= 1000 && $3 != 65534 {print $1, "UID:"$3, "Shell:"$7}'
k UID:1000 Shell:/bin/bash
developer UID:1001 Shell:/bin/bash
deploy UID:1002 Shell:/bin/bash



k@devserver:~$ grep '^sudo:.*$' /etc/group | cut -d: -f4
k,developer
k@devserver:~$ sudo cat /etc/sudoers | grep -v '^#' | grep -v '^$'
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
Defaults        use_pty
root    ALL=(ALL:ALL) ALL
%admin ALL=(ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
@includedir /etc/sudoers.d


Fail2BAN

k@devserver:~$ fail2ban-client --version
Command 'fail2ban-client' not found, but can be installed with:
sudo apt install fail2ban
k@devserver:~$ sudo apt install fail2ban
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  python3-pyasyncore python3-pyinotify whois
Suggested packages:
  mailx monit sqlite3 python-pyinotify-doc
The following NEW packages will be installed:
  fail2ban python3-pyasyncore python3-pyinotify whois
0 upgraded, 4 newly installed, 0 to remove and 3 not upgraded.
Need to get 496 kB of archives.
After this operation, 2,572 kB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Get:1 http://ge.archive.ubuntu.com/ubuntu noble/main amd64 python3-pyasyncore all 1.0.2-2 [10.1 kB]
Get:2 http://ge.archive.ubuntu.com/ubuntu noble-updates/universe amd64 fail2ban all 1.0.2-3ubuntu0.1 [409 kB]
Get:3 http://ge.archive.ubuntu.com/ubuntu noble/main amd64 python3-pyinotify all 0.9.6-2ubuntu1 [25.0 kB]
Get:4 http://ge.archive.ubuntu.com/ubuntu noble/main amd64 whois amd64 5.5.22 [51.7 kB]
Fetched 496 kB in 1s (368 kB/s)
Selecting previously unselected package python3-pyasyncore.
(Reading database ... 100564 files and directories currently installed.)
Preparing to unpack .../python3-pyasyncore_1.0.2-2_all.deb ...
Unpacking python3-pyasyncore (1.0.2-2) ...
Selecting previously unselected package fail2ban.
Preparing to unpack .../fail2ban_1.0.2-3ubuntu0.1_all.deb ...
Unpacking fail2ban (1.0.2-3ubuntu0.1) ...
Selecting previously unselected package python3-pyinotify.
Preparing to unpack .../python3-pyinotify_0.9.6-2ubuntu1_all.deb ...
Unpacking python3-pyinotify (0.9.6-2ubuntu1) ...
Selecting previously unselected package whois.
Preparing to unpack .../whois_5.5.22_amd64.deb ...
Unpacking whois (5.5.22) ...
Setting up whois (5.5.22) ...
Setting up python3-pyasyncore (1.0.2-2) ...
Setting up fail2ban (1.0.2-3ubuntu0.1) ...
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:224: SyntaxWarning: invalid escape sequence '\s'
  "1490349000 test failed.dns.ch", "^\s*test <F-ID>\S+</F-ID>"
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:435: SyntaxWarning: invalid escape sequence '\S'
  '^'+prefix+'<F-ID>User <F-USER>\S+</F-USER></F-ID> not allowed\n'
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:443: SyntaxWarning: invalid escape sequence '\S'
  '^'+prefix+'User <F-USER>\S+</F-USER> not allowed\n'
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:444: SyntaxWarning: invalid escape sequence '\d'
  '^'+prefix+'Received disconnect from <F-ID><ADDR> port \d+</F-ID>'
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:451: SyntaxWarning: invalid escape sequence '\s'
  _test_variants('common', prefix="\s*\S+ sshd\[<F-MLFID>\d+</F-MLFID>\]:\s+")
/usr/lib/python3/dist-packages/fail2ban/tests/fail2banregextestcase.py:537: SyntaxWarning: invalid escape sequence '\['
  'common[prefregex="^svc\[<F-MLFID>\d+</F-MLFID>\] connect <F-CONTENT>.+</F-CONTENT>$"'
/usr/lib/python3/dist-packages/fail2ban/tests/servertestcase.py:1375: SyntaxWarning: invalid escape sequence '\s'
  "`{ nft -a list chain inet f2b-table f2b-chain | grep -oP '@addr-set-j-w-nft-mp\s+.*\s+\Khandle\s+(\d+)$'; } | while read -r hdl; do`",
/usr/lib/python3/dist-packages/fail2ban/tests/servertestcase.py:1378: SyntaxWarning: invalid escape sequence '\s'
  "`{ nft -a list chain inet f2b-table f2b-chain | grep -oP '@addr6-set-j-w-nft-mp\s+.*\s+\Khandle\s+(\d+)$'; } | while read -r hdl; do`",
/usr/lib/python3/dist-packages/fail2ban/tests/servertestcase.py:1421: SyntaxWarning: invalid escape sequence '\s'
  "`{ nft -a list chain inet f2b-table f2b-chain | grep -oP '@addr-set-j-w-nft-ap\s+.*\s+\Khandle\s+(\d+)$'; } | while read -r hdl; do`",
/usr/lib/python3/dist-packages/fail2ban/tests/servertestcase.py:1424: SyntaxWarning: invalid escape sequence '\s'
  "`{ nft -a list chain inet f2b-table f2b-chain | grep -oP '@addr6-set-j-w-nft-ap\s+.*\s+\Khandle\s+(\d+)$'; } | while read -r hdl; do`",
Created symlink /etc/systemd/system/multi-user.target.wants/fail2ban.service → /usr/lib/systemd/system/fail2ban.service.
Setting up python3-pyinotify (0.9.6-2ubuntu1) ...
Processing triggers for man-db (2.12.0-4build2) ...
Scanning processes...
Scanning candidates...
Scanning linux images...

Running kernel seems to be up-to-date.

Restarting services...

Service restarts being deferred:
 /etc/needrestart/restart.d/dbus.service
 systemctl restart systemd-logind.service
 systemctl restart unattended-upgrades.service

No containers need to be restarted.

User sessions running outdated binaries:
 k @ user manager service: systemd[1006]

No VM guests are running outdated hypervisor (qemu) binaries on this host.
k@devserver:~$ fail2ban-client --version
Fail2Ban v1.0.2
k@devserver:~$ sudo systemctl status fail2ban
● fail2ban.service - Fail2Ban Service
     Loaded: loaded (/usr/lib/systemd/system/fail2ban.service; enabled; preset: enabled)
     Active: active (running) since Wed 2026-02-11 06:56:37 UTC; 40s ago
       Docs: man:fail2ban(1)
   Main PID: 169859 (fail2ban-server)
      Tasks: 5 (limit: 9436)
     Memory: 25.3M (peak: 25.5M)
        CPU: 1.689s
     CGroup: /system.slice/fail2ban.service
             └─169859 /usr/bin/python3 /usr/bin/fail2ban-server -xf start

Feb 11 06:56:37 devserver systemd[1]: Started fail2ban.service - Fail2Ban Service.
Feb 11 06:56:38 devserver fail2ban-server[169859]: 2026-02-11 06:56:38,299 fail2ban.configreader   [169859]: WARNING 'allowipv6' not defined in 'Definition'. Using default one: 'auto'
Feb 11 06:56:40 devserver fail2ban-server[169859]: Server ready
k@devserver:~$ sudo fail2ban-client status
Status
|- Number of jail:      1
`- Jail list:   sshd


k@devserver:~$ grep "PermitRootLogin" /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# the setting of "PermitRootLogin prohibit-password".



k@devserver:~$ last -a | head -n 10
k        pts/0        Wed Feb 11 05:51   still logged in    192.168.56.1
k        pts/0        Tue Feb 10 17:16 - 05:23  (12:06)     192.168.56.1
k        pts/1        Tue Feb 10 16:25 - 17:16  (00:50)     192.168.56.1
k        pts/1        Tue Feb 10 16:21 - 16:25  (00:03)     192.168.56.1
k        pts/0        Tue Feb 10 15:21 - 16:27  (01:05)     192.168.56.1
reboot   system boot  Tue Feb 10 15:18   still running      6.8.0-100-generic
k        pts/0        Tue Feb 10 15:02 - crash  (00:16)     192.168.56.1
reboot   system boot  Tue Feb 10 14:58   still running      6.8.0-100-generic
reboot   system boot  Tue Feb 10 14:42 - 14:55  (00:13)     6.8.0-100-generic
reboot   system boot  Tue Feb 10 07:45 - 14:39  (06:53)     6.8.0-100-generic
k@devserver:~$
