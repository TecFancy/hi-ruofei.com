---
title: Docker 入门之安装教程
abbrlink: fff5156a
date: 2021-06-22 11:45:59
updated:
categories:
  - 前端开发
tags:
  - 前端进阶
---

本篇介绍了在 Mac OS, Windows, Linux 下的 Docker 安装方法。开始之前我们先看一下官方对 Docker 的介绍：

> Docker Engine is available for Linux ([CentOS](https://store.docker.com/editions/community/docker-ce-server-centos), [Debian](https://store.docker.com/editions/community/docker-ce-server-debian), [Fedora](https://store.docker.com/editions/community/docker-ce-server-fedora), [Oracle Linux](https://store.docker.com/editions/enterprise/docker-ee-server-oraclelinux), [RHEL](https://store.docker.com/editions/enterprise/docker-ee-server-rhel), [SUSE](https://store.docker.com/editions/enterprise/docker-ee-server-sles), and [Ubuntu](https://store.docker.com/editions/community/docker-ce-server-ubuntu)) or [Windows Server](https://store.docker.com/editions/enterprise/docker-ee-server-windows) operating systems and is based on containerd - the open source container runtime project that Docker donated to the Cloud Native Computing Foundation (CNCF) in 2017. It is available as both a free community-supported engine and as a commercially-supported enterprise engine (Docker Engine-Enterprise) that also forms the foundation for an enterprise container platform.

通过官方的介绍我们不难发现，Docker 已经基本上覆盖了全平台，对于英文好的朋友，直接去官网按照指南一步一步安装即可。

英文一般的朋友，继续往下看吧那就～

<!-- more -->

## Mac OS 上的 Docker 安装方法

第一种方法是下载官方的 `dmg` 安装包：

[Docker Descktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

安装该软件包对系统的要求：

> Requires Apple Mac OS Sierra 10.12 or above. Download [Docker Toolbox](https://docs.docker.com/toolbox/overview/) for previous OS versions.

只要系统是 Mac OS Sierra 10.12 以上即可。

下载完 `Docker.dmg` 安装包之后，双击即可以安装，可能需要系统管理员权限，输入密码即可。

安装成功后，在系统菜单栏上会有 Docker 的小图标：

![Docker 小图标](https://gitee.com/smpower/oss/raw/master/hi-ruofei.com/Xt0mTI.png)

安装完之后，在终端工具中，使用 `docker version` 来查看 Docker 版本。

```bash
➜  ~ docker version
Client:
 Cloud integration: 1.0.14
 Version:           20.10.6
 API version:       1.41
 Go version:        go1.16.3
 Git commit:        370c289
 Built:             Fri Apr  9 22:46:57 2021
 OS/Arch:           darwin/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.6
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.13.15
  Git commit:       8728dd2
  Built:            Fri Apr  9 22:44:56 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.4
  GitCommit:        05f951a3781f4f2c1911b05e61c160e9c30eaa8e
 runc:
  Version:          1.0.0-rc93
  GitCommit:        12644e614e25b05da6fd08a38ffa0cfe1903fdec
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

设置中国区加速地址：

![设置 Docker 中国区加速地址](https://gitee.com/smpower/oss/raw/master/hi-ruofei.com/xaybI4.png)

上面打码的地址是阿里云提供的 Docker 镜像加速地址，每个人都可以去申请一个个人镜像地使用。

> 阿里云 Docker 镜像加速：[Docker 镜像加速器](https://yq.aliyun.com/articles/29941)

第二种方法是通过 `brew cask` 安装：

```bash
➜  ~ brew update
➜  ~ brew cask install docker
➜  ~ brew cask uninstall docker # 删除的方法, 还需要手动删除Docker.app
```

上面的命令将会把 Docker 安装在 `Applications` 目录下。

## Windows 上 Docker 安装

官方下载地址：[Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

对系统的要求：

> Requires Microsoft Windows 10 Professional or Enterprise 64-bit. For previous versions get [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

需要 Windows 10 专业版及企业的 64 位版本，在 Windows server 2016 以上亲测是可用的。Windows 8/7/Vista/Xp 之类的，就别想了，老实去装 Windows 10 或者虚拟机中去使用。

## Linux 上 Docker 安装

下面介绍最常见的 Linux 系统下安装 Docker 的方法。

### Centos 中 Docker 安装方法

1. 先删除旧的版本（如果没有可以跳过）

   ```bash
   $ sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
   ```

2. 安装必须的依赖：

   ```bash
   $ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
   ```

   添加 `stable` 的 Docker-ce 的源：

   ```bash
   $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
   ```

3. 安装 `docker-ce`：

   ```bash
   $ sudo yum install docker-ce docker-ce-cli containerd.io
   ```

4. 选择指定的安装版本（可选）：

   ```bash
   $ yum list docker-ce --showduplicates | sort -r
   docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
   docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
   docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
   docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
   ```

   我们来举个例子，比如我们要安装 `3:18.09.1-3.el7` 这个版本，使用如下命令结构：

   ```bash
   ➜  ~ sudo yum install docker-ce- docker-ce-cli- containerd.io
   ```

   第一部分是 `docker-ce`，第二部分是版本号 `18.09.1`，看明白了吗？就是这样子：

   ```bash
   $ sudo yum install -y docker-ce-18.09.1 docker-ce-cli-18.09.1
   ```

5. 启动服务并测试一下：

   ```bash
   $ sudo systemctl start docker # 启动服务
   $ sudo docker run hello-world # 来一个 Hello World 吧
   Unable to find image 'hello-world:latest' locally
   latest: Pulling from library/hello-world
   1b930d010525: Pull complete
   Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
   Status: Downloaded newer image for hello-world:latest

   Hello from Docker!
   This message shows that your installation appears to be working correctly.

   To generate this message, Docker took the following steps:
   1. The Docker client contacted the Docker daemon.
   2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
   (amd64)
   3. The Docker daemon created a new container from that image which runs the
   executable that produces the output you are currently reading.
   4. The Docker daemon streamed that output to the Docker client, which sent it
   to your terminal.

   To try something more ambitious, you can run an Ubuntu container with:
   $ docker run -it ubuntu bash

   Share images, automate workflows, and more with a free Docker ID:
   https://hub.docker.com/

   For more examples and ideas, visit:
   https://docs.docker.com/get-started/
   ```

   如果看到上面的提示，说明 Docker 已经成功安装并运行了。

6. 关于升级&删除：

   升级：

   ```bash
   $ yum -y update # 更新所有
   $ yum -y update docker-ce docker-ce-cli containerd.io # 更新指定
   ```

   删除：

   ```bash
   $ sudo yum remove docker-ce
   $ sudo rm -rf /var/lib/docker # 删除文件系统
   ```

### Debian 中 Docker 的安装方法

1. 删除旧的版本(可跳过)

   ```bash
   $ sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 安装依赖：

   ```bash
   $ sudo apt-get update
   $ sudo apt-get install \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg \
   lsb-release
   $ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

3. 使用 `stable` 安装源：

   - x86_64 / amd64

   ```bash
   $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
   ```

   - armhf

   ```bash
   $ sudo add-apt-repository "deb [arch=armhf] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
   ```

   - arm64

   ```bash
   $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
   ```

4. 安装 `docker-ce`：

   ```bash
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

5. 安装指定的版本（可选）：

   ```bash
   $ apt-cache madison docker-ce
   docker-ce | 5:18.09.1~3-0~debian-stretch | https://download.docker.com/linux/debian stretch/stable amd64 Packages
   docker-ce | 5:18.09.0~3-0~debian-stretch | https://download.docker.com/linux/debian stretch/stable amd64 Packages
   docker-ce | 18.06.1~ce~3-0~debian        | https://download.docker.com/linux/debian stretch/stable amd64 Packages
   docker-ce | 18.06.0~ce~3-0~debian        | https://download.docker.com/linux/debian stretch/stable amd64 Packages
   ...
   ```

   安装格式：

   ```bash
   $ sudo apt-get install docker-ce= docker-ce-cli= containerd.io
   ```

   举例说明：比如要安装 `5:18.09.1~3-0~debian-stretch` 版本的 docker 的话：

   ```bash
   $ sudo apt-get install docker-ce=18.09.1 docker-ce-cli=18.09.1 containerd.io
   ```

6. 启动服务并测试：

   ```bash
   $ sudo service docker start
   
   # 查看Docker运行状态
   $ sudo service docker status
   $ sudo docker run hello-world
   ```

### Ubuntu 中 Docker 安装方法

1. 删除旧的版本(可跳过)

   ```bash
   $ sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 安装依赖：

   ```bash
   $ sudo apt-get update
   $ sudo apt-get install
   apt-transport-https
   ca-certificates
   curl
   gnupg-agent
   software-properties-common
   $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - # 添加GPG key
   $ sudo apt-key fingerprint 0EBFCD88
   pub   rsa4096 2017-02-22 [SCEA]
   9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
   uid           [ unknown] Docker Release (CE deb)
   sub   rsa4096 2017-02-22 [S]
   ```

3. 使用 `stable` 安装源：

   - x86_64/amd64

     ```bash
     $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     ```

   - [armhf]

     ```bash
     $ sudo add-apt-repository "deb [arch=armhf] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     ```

   - [arm64]

     ```bash
     $ sudo add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     ```

   - [ppc64le (IBM Power)]

     ```bash
     $ sudo add-apt-repository "deb [arch=ppc64el] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     ```

   - s390x (IBM Z)

     ```bash
     $ sudo add-apt-repository "deb [arch=s390x] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     ```

4. 安装 `docker-ce`：

   ```bash
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

5. 安装指定的版本（可选）：

   ```bash
   $ apt-cache madison docker-ce  docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages  docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages  docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages  docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages  ...
   ```

   安装格式：

   ```bash
   $ sudo apt-get install docker-ce= docker-ce-cli= containerd.io
   ```

   举例说明：比如要安装 `5:18.09.1~3-0~ubuntu-xenial` 版本的 docker 的话：

   ```bash
   $ sudo apt-get install docker-ce=18.09.1 docker-ce-cli=18.09.1 containerd.io
   ```

6. 启动服务并测试：

   ```bash
   $ sudo service docker start
   $ sudo service docker status # 查看 Docker 运行状态
   $ sudo docker run hello-world
   ```

## Docker-compose 集合命令

Compose 工具是一个 `批量` 工具，用于运行与管理多个 `docker` 容器。

官方文档：[Install Docker Compose](https://docs.docker.com/compose/install/)

1. 在 Mac/Windows 中，已经集成了 docker-compose 命令

2. 在 WindowsServer 中 先启动 PowerShell

   ```bash
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
   ```

   然后运行如下命令：

   ```bash
   Invoke-WebRequest "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-Windows-x86_64.exe" -UseBasicParsing -OutFile $Env:ProgramFilesDockerdocker-compose.exe
   ```

   然后测试一下：`docker-compose --version`

   ```bash
   # 下载docker-compose
   sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   # 给予执行权限
   sudo chmod +x /usr/local/bin/docker-compose
   # 测试命令
   $ docker-compose --version
   docker-compose version 1.23.2, build 1110ad01
   ```

以上就是在各个平台安装 Docker 的步骤，欢迎在下方留言交流。

