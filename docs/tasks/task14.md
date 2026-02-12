# 🚀 Task 14 — Docker Installation

---

## 📦 საჭირო პაკეტები

```bash
sudo apt update
```
```bash
sudo apt install ca-certificates curl gnupg -y
```

## 🔐 Docker-ის ოფიციალური GPG Key და Repository

```bash
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg


echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

🐳 Docker-ის ინსტალაცია
```bash
sudo apt update
```

```bash
sudo apt install docker-ce docker-ce-cli containerd.io \
docker-buildx-plugin docker-compose-plugin -y
```

## 📋 ინსტალაციის პროცესი (Output)

```console
k@devserver:~$ sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  docker-ce-rootless-extras libslirp0 pigz slirp4netns
Suggested packages:
  cgroupfs-mount | cgroup-lite docker-model-plugin
The following NEW packages will be installed:
  containerd.io docker-buildx-plugin docker-ce docker-ce-cli docker-ce-rootless-extras docker-compose-plugin libslirp0 pigz slirp4netns
0 upgraded, 9 newly installed, 0 to remove and 2 not upgraded.
Need to get 96.7 MB of archives.
After this operation, 391 MB of additional disk space will be used.
Get:1 http://ge.archive.ubuntu.com/ubuntu noble/universe amd64 pigz amd64 2.8-1 [65.6 kB]
Get:2 https://download.docker.com/linux/ubuntu noble/stable amd64 containerd.io amd64 2.2.1-1~ubuntu.24.04~noble [23.4 MB]
Get:3 http://ge.archive.ubuntu.com/ubuntu noble/main amd64 libslirp0 amd64 4.7.0-1ubuntu3 [63.8 kB]
Get:4 http://ge.archive.ubuntu.com/ubuntu noble/universe amd64 slirp4netns amd64 1.2.1-1build2 [34.9 kB]
Get:5 https://download.docker.com/linux/ubuntu noble/stable amd64 docker-ce-cli amd64 5:29.2.1-1~ubuntu.24.04~noble [16.3 MB]
Get:6 https://download.docker.com/linux/ubuntu noble/stable amd64 docker-ce amd64 5:29.2.1-1~ubuntu.24.04~noble [22.5 MB]
Get:7 https://download.docker.com/linux/ubuntu noble/stable amd64 docker-buildx-plugin amd64 0.31.1-1~ubuntu.24.04~noble [20.3 MB]
Get:8 https://download.docker.com/linux/ubuntu noble/stable amd64 docker-ce-rootless-extras amd64 5:29.2.1-1~ubuntu.24.04~noble [6,387 kB]
Get:9 https://download.docker.com/linux/ubuntu noble/stable amd64 docker-compose-plugin amd64 5.0.2-1~ubuntu.24.04~noble [7,721 kB]
Fetched 96.7 MB in 14s (7,017 kB/s)
Selecting previously unselected package containerd.io.
(Reading database ... 89575 files and directories currently installed.)
Preparing to unpack ...
...
No VM guests are running outdated hypervisor (qemu) binaries on this host.
```

👤 User-ის დამატება Docker Group-ში

sodu-ს გარეშე მუშაობისთვის:
```bash
sudo usermod -aG docker $USER
```

Session-ის განახლება:
```bash
newgrp docker
```

✅ შემოწმება (sudo-ს გარეშე)

k@devserver:~$ sudo usermod -aG docker $USER
k@devserver:~$ newgrp docker
k@devserver:~$ docker --version
Docker version 29.2.1, build a5c7197

k@devserver:~$ docker compose version
Docker Compose version v5.0.2


🧪 ტესტი — hello-world

```bash
k@devserver:~$ docker run hello-world
```


```console
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
17eec7bbc9d7: Pull complete
ea52d2000f90: Download complete
Digest: sha256:05813aedc15fb7b4d732e1be879d3252c1c9c25d885824f6295cab4538cb85cd
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

```

📖 დამატებითი ინფორმაცია

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image.
 4. The Docker daemon streamed that output to the Docker client.

To try something more ambitious:
 $ docker run -it ubuntu bash

Docker Hub:
 https://hub.docker.com/

Docs:
 https://docs.docker.com/get-started/

```

