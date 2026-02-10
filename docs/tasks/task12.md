Cron Automation

Crontab-ის გახსნა:
bashcrontab -e

ბოლოში დასამატებელია:**
```
0 3 * * * /home/$USER/db_backup.sh >> /home/$USER/backups/cron.log 2>&1
```

**3 ნიშნავს `0 3 * * *`:**
```
0 3 * * *
│ │ │ │ │
│ │ │ │ └── კვირის დღე (ნებისმიერი)
│ │ │ └──── თვე (ნებისმიერი)
│ │ └────── დღე (ნებისმიერი)
│ └──────── საათი → 3:00 AM
└────────── წუთი → 00


k@devserver:~$ crontab -e
no crontab for k - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]: 1
crontab: installing new crontab

შემოწმება

k@devserver:~$ crontab -l
# Edit this file to introduce tasks to be run by cron.
#
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
#
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').
#
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
#
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
#
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
#
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command

0 3 * * * /home/$USER/db_backup.sh >> /home/$USER/backups/cron.log 2>&1


სტატუსის შემოწმება
k@devserver:~$ cat ~/backups/cron.log
cat: /home/k/backups/cron.log: No such file or directory
k@devserver:~$ ^C
k@devserver:~$ sudo systemctl status cron
[sudo] password for k:
● cron.service - Regular background program processing daemon
     Loaded: loaded (/usr/lib/systemd/system/cron.service; enabled; preset: enabled)
     Active: active (running) since Tue 2026-02-10 15:21:14 UTC; 2h 53min ago
       Docs: man:cron(8)
   Main PID: 965 (cron)
      Tasks: 1 (limit: 9436)
     Memory: 456.0K (peak: 2.2M)
        CPU: 712ms
     CGroup: /system.slice/cron.service
             └─965 /usr/sbin/cron -f -P

Feb 10 17:35:01 devserver CRON[42903]: pam_unix(cron:session): session closed for user root
Feb 10 17:45:01 devserver CRON[46291]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
Feb 10 17:45:01 devserver CRON[46292]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
Feb 10 17:45:01 devserver CRON[46291]: pam_unix(cron:session): session closed for user root
Feb 10 17:55:01 devserver CRON[49630]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
Feb 10 17:55:01 devserver CRON[49631]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
Feb 10 17:55:01 devserver CRON[49630]: pam_unix(cron:session): session closed for user root
Feb 10 18:05:01 devserver CRON[52978]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
Feb 10 18:05:01 devserver CRON[52979]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
Feb 10 18:05:01 devserver CRON[52978]: pam_unix(cron:session): session closed for user root



ტესტირება მაშინვე

```Bash
~/db_backup.sh
cat ~/backups/cron.log
```

cron.log მხოლოდ მაშინ შეიქმნება, როცა cron გაუშვებს სკრიპტს (3:00 AM-ზე). ხელით გაშვებისას ლოგი ტერმინალში გამოჩნდა პირდაპირ