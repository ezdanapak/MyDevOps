Task 4 — SSH Configuration

## Bash commands
```bash
# SSH სერვერის ინსტალაცია და კონფიგურაცია
systemctl status ssh
sudo apt update
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```
```bash
# Firewall კონფიგურაცია
sudo ufw status
sudo ufw allow ssh
sudo ufw allow 22
```

## SSH Key Authentication 
მუშაობს "ბოქლომისა და გასაღების" პრინციპით: შენს კომპიუტერზე (Host) გაქვს Private Key (გასაღები), ხოლო სერვერზე აგდებ Public Key-ს (ბოქლომს).


## MobaXterm SSH Key Generator
MobaXterm-ს მოყვება ხელსაწყო, რომელიც ამას აკეთებს. <br>

გახსენი MobaXterm და მენიუში აირჩიე: Tools -> MobaKeyGen (SSH key generator). <br>
დააჭირე ღილაკს Generate და ამოძრავე მაუსი ცარიელ ადგილას (ეს საჭიროა შემთხვევითი  <br> მონაცემების შესაქმნელად).
გასაღები როცა შეიქმნება: <br>
Public Key: დააკოპირე ის გრძელი ტექსტი, რომელიც ფანჯრის ზედა ნაწილში გამოჩნდა (იწყება <br> ssh-rsa-ით).
Private Key: დააჭირე Save private key და შეინახე შენს კომპიუტერზე (მაგ: my_key.ppk).  <br>პაროლის (passphrase) დადება აუცილებელი არ არის, შეგიძლია გამოტოვო. <br>

key passphrase: ----

Public Key:
!!! example
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCC004lHrwHeoubnDFDZFcZidF84h3dwYmafcgUaT5/x0/ <br> qGEtDR2wXlDeFVOsE60EaUu0OBVtlSlwKhqUuOuH4n9WFaVgJwZdpdyKyHCpBH/krULumPLu9DL5<br>+58b8L4Ok8uI72F2n+gkJpNrynDbd/9lW20G00hPyGEIEMDljQaMOrUz6QbiopDiuYmpRy4vSRy7 <br>+PPy7NVv5okiAmHczZeybi3vPYOkTVXhYmdQq9IHoOgRPkk4e6cMuJuQoa9kjPhgERdmuFmlJ12KM27xSVX+R <br> +E0GD1hXq9B4mnrE1ivsZcYqJFvOFrc9mhEqdFcvsO3EQNm1Xwkcxg0WXeUL rsa-key-20260210 <br>

## Public Key-ს დამატება Ubuntu სერვერზე
ახლა სერვერს უნდა "ვასწავლოთ" შენი გასაღები. <br>

შედი სერვერზე (ჯერჯერობით პაროლით) MobaXterm-იდან.
შექმენი სპეციალური დირექტორია და ფაილი:
```bash
mkdir -p ~/.ssh
```
```bash
chmod 700 ~/.ssh
```
!!! tip
    ++ctrl+x++ დაგეხმარება გახსნილი ფაილის დახურვაში <br>
    ++ctrl+y++ დაგეხმარება დასტურში ფაილის სახელზე <br>
    ++enter++ უბრალოდ თანხმობა და ფაილი დაიხურება <br>

აქ შეგიძლია გასაღების ჩაშვება
```bash
nano ~/.ssh/authorized_keys
```
ჩასვი (Paste) ის ტექსტი, რომელიც წეღან MobaKeyGen-იდან დააკოპირე. <br>
შეინახე და გამოდი. <br>
მიანიჭე ფაილს სწორი უფლებები: <br>
```bash
chmod 600 ~/.ssh/authorized_keys
```

## MobaXterm-ის კონფიგურაცია
ახლა უნდა ვუთხრათ MobaXterm-ს, რომ ამ სერვერთან დაკავშირებისას გამოიყენოს შენი ფაილი. <br>

MobaXterm-ში დააწკაპუნე მარჯვენა ღილაკით შენს სესიაზე (Session) და აირჩიე Edit session. <br>
გადადი SSH settings ტაბში. <br>
მონიშნე Use private key. <br>
დააჭირე ლურჯ ხატულას და აირჩიე ის .ppk ფაილი, რომელიც ნაბიჯ 1-ში შეინახე. <br>
დააჭირე OK. <br>


## შემოწმება
გათიშე მიმდინარე სესია და ხელახლა დაუკავშირდი სერვერს. <br>
თუ ყველაფერი სწორად გააკეთე, სერვერი პაროლს აღარ მოგთხოვს და პირდაპირ ტერმინალში შეგიშვებს. <br>

## პაროლით შესვლის აკრძალვა

```bash
sudo nano /etc/ssh/sshd_config
```
მოძებნე ეს ხაზი
PasswordAuthentication <br>
და გადააკეთე ასე 
PasswordAuthentication no <br>

### გადატვირთვა SSH
```bash
sudo systemctl restart ssh
```
