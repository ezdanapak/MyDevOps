Task 21 — Disk Space Management

ყველაზე დიდი დირექტორიების პოვნა
სანამ რამეს წაშლი, უნდა გაარკვიო, სად არის "დამალული" დიდი მოცულობის ფაილები. ამისთვის გამოიყენება du (Disk Usage) ბრძანება.

გაუშვი ეს ბრძანება, რომელიც აჩვენებს ტოპ 10 ყველაზე დიდ საქაღალდეს root (/) დირექტორიაში:

Bash
sudo du -ah / | sort -rh | head -n 10
-a: ყველა ფაილი და დირექტორია.

-h: ადამიანისთვის გასაგები ფორმატი (GB, MB).

sort -rh: დახარისხება ზომის მიხედვით (დიდიდან პატარისკენ).


ყველაზე დიდი დირექტორიების მოცულობა

k@devserver:~$ sudo du -ah / | sort -rh | head -n 10
du: cannot access '/proc/147776/task/148287/fd/120': No such file or directory
du: cannot access '/proc/147776/task/148287/fdinfo/122': No such file or directory
du: cannot access '/proc/147776/task/148298/fd/133': No such file or directory
du: cannot access '/proc/158262/task/158262/fd/4': No such file or directory
du: cannot access '/proc/158262/task/158262/fdinfo/4': No such file or directory
du: cannot access '/proc/158262/fd/3': No such file or directory
du: cannot access '/proc/158262/fdinfo/3': No such file or directory
du: cannot access '/proc/158332': No such file or directory
9.6G    /
4.1G    /swap.img
3.7G    /usr
2.1G    /usr/lib
1.8G    /var
1.4G    /var/lib
606M    /var/lib/containerd
557M    /usr/lib/firmware
556M    /usr/libexec
497M    /var/lib/docker








30 დღეზე ძველი ფაილების პოვნა და წაშლა
ამისთვის ვიყენებთ find ბრძანებას. ეს ძალიან ძლიერი ინსტრუმენტია, ამიტომ სიფრთხილეა საჭირო.

ჯერ ნახე ფაილების სია (უსაფრთხოებისთვის):
სანამ წაშლი, ნახე რა ფაილებს პოულობს სისტემა /var/log დირექტორიაში, რომლებიც 30 დღეზე მეტი ხნისაა:

Bash
sudo find /var/log -type f -mtime +30
შემდეგ წაშალე ისინი:
თუ დარწმუნდი, რომ სიაში ზედმეტი არაფერია, დაამატე -delete ფლაგები:

Bash
sudo find /var/log -type f -mtime +30 -delete
-type f: ეძებს მხოლოდ ფაილებს.

-mtime +30: ეძებს ფაილებს, რომლებიც 30 დღეზე მეტია არ შეცვლილა.


k@devserver:~$ sudo find /var/log -type f -mtime +30
/var/log/bootstrap.log
/var/log/btmp
/var/log/faillog
/var/log/landscape/sysinfo.log

sudo find /var/log -type f -mtime +30 -delete

სისტემური ლოგების (Journald) გასუფთავება
Ubuntu-ში სისტემური ლოგები (journalctl) ხშირად დიდ ადგილს იკავებს. შეგიძლია უბრძანო სისტემას, დატოვოს მხოლოდ ბოლო 2 დღის ლოგები:

Bash
sudo journalctl --vacuum-time=2d
ან შეზღუდო ზომის მიხედვით (მაგალითად, დატოვოს მხოლოდ 500MB):

Bash
sudo journalctl --vacuum-size=500M


არ გამომიყენებია | არც ავტომატური Cron Job


სისტემური ლოგების (Journald) გასუფთავება
Ubuntu-ში სისტემური ლოგები (journalctl) ხშირად დიდ ადგილს იკავებს. შეგიძლია უბრძანო სისტემას, დატოვოს მხოლოდ ბოლო 2 დღის ლოგები:

Bash
sudo journalctl --vacuum-time=2d
ან შეზღუდო ზომის მიხედვით (მაგალითად, დატოვოს მხოლოდ 500MB):

Bash
sudo journalctl --vacuum-size=500M
4. პაკეტების მენეჯერის გასუფთავება (APT)
ინსტალაციების შემდეგ დარჩენილი დროებითი ფაილების (cache) წაშლა:

Bash
sudo apt-get autoremove # გამოუყენებელი პაკეტების წაშლა
sudo apt-get clean      # გადმოწერილი .deb ფაილების წაშლა
როგორ შევამოწმოთ შედეგი?
დავალების დასრულების შემდეგ შეამოწმე თავისუფალი ადგილი:

Bash
df -h