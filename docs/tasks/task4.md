
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

MobaXterm SSH Key Generator
key passphrase: ----

Public Key:

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCC004lHrwHeoubnDFDZFcZidF84h3dwYmafcgUaT5/x0/qGEtDR2wXlDeFVOsE60EaUu0OBVtlSlwKhqUuOuH4n9WFaVgJwZdpdyKyHCpBH/krULumPLu9DL5+58b8L4Ok8uI72F2n+gkJpNrynDbd/9lW20G00hPyGEIEMDljQaMOrUz6QbiopDiuYmpRy4vSRy7+PPy7NVv5okiAmHczZeybi3vPYOkTVXhYmdQq9IHoOgRPkk4e6cMuJuQoa9kjPhgERdmuFmlJ12KM27xSVX+R+E0GD1hXq9B4mnrE1ivsZcYqJFvOFrc9mhEqdFcvsO3EQNm1Xwkcxg0WXeUL rsa-key-20260210

```Bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
აქ შეგიძლია გასაღების ჩაშვება
chmod 600 ~/.ssh/authorized_keys
```


პაროლით შესვლის აკრძალვა
sudo nano /etc/ssh/sshd_config

PasswordAuthentication
PasswordAuthentication no.

გადატვირთვა SSH
sudo systemctl restart ssh
