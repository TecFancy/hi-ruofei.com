---
title: 使用 Docker 搭建 MediaWiki
abbrlink: e707884f
date: 2021-10-29 23:51:56
updated:
categories: MediaWiki
tags:
keywords:
  - MediaWiki
  - Docker
---

本文介绍了使用 Docker 镜像搭建 MediaWiki 的步骤和方法。借助 Docker 能非常方便的搭建个人维基站点，在数据的备份等维护操作上同样也很便利。使用 Docker 镜像搭建的维基站点，不会在宿主机上安装 LNMP 或 LAMP 环境，能始终保持宿主机的干净清爽。

<!-- more -->

### 准备镜像

1. mediawiki 镜像：`docker pull mediawiki`；
2. mariadb 镜像：`docker pull mariadb`；
3. nginx 镜像：`docker pull nginx`。

### 启动 mariadb 数据库容器

终端中执行以下命令：

```bash
docker run -d --name mariadb -p 3306:3306 -e MARIADB_ROOT_PASSWORD=my-secret-pw mariadb
```

说明：

- `d`：默认不会进入容器。
- `p`：将容器内部使用的网络端口 3306 映射到物理机 3306 端口上（注意与参数 `P` 的区别：将容器内部使用的网络端口随机映射到主机上）。
- `e MARIADB_ROOT_PASSWORD`：配置 `mariadb` 数据库 `root` 密码。

### 启动 mediawiki 容器

终端中执行以下命令：

```bash
docker run -d --name mediawiki -p 81:80 -p 444:443 --link mariadb:mariadb mediawiki
```

说明：参数 `--link mariadb:mariadb` 表示将容器 `mariadb` 链接到 `mediawiki` 容器上，冒号（`:`）前的 `mariadb` 是上一步运行的 `mariadb` 容器的名称，冒号后面的 `mariadb` 是该容器（`mediawiki` 容器）下的别名。

### 启动 nginx 容器

终端中执行以下命令：

```bash
docker run -d --name nginx -p 80:80 -p 443:443 nginx
```

### 修改 nginx 配置文件

首先，进入 nginx 容器，cd 到 nginx 的配置目录：

```bash
docker exec -it nginx bash # 进入 nginx 容器
cd /etc/nginx # cd 到 nginx 的配置目录
```

以下是该目录下的文件和文件夹：

```
[lighthouse@centos]~% docker exec -it nginx bash
root@df21774abed5:/# cd /etc/nginx
root@df21774abed5:/etc/nginx# ls -al
drwxr-xr-x 1 root root 4096 Oct 16 15:18 .
drwxr-xr-x 1 root root 4096 Oct 16 15:18 ..
drwxr-xr-x 1 root root 4096 Oct 16 15:19 conf.d
-rw-r--r-- 1 root root 1007 Sep  7 15:21 fastcgi_params
-rw-r--r-- 1 root root 5290 Sep  7 15:21 mime.types
lrwxrwxrwx 1 root root   22 Sep  7 15:38 modules -> /usr/lib/nginx/modules
-rw-r--r-- 1 root root  648 Sep  7 15:38 nginx.conf
-rw-r--r-- 1 root root  636 Sep  7 15:21 scgi_params
-rw-r--r-- 1 root root  664 Sep  7 15:21 uwsgi_params
```

nginx 的默认配置文件是 conf.d 文件夹下的 default.conf 文件，退出容器并将 default.conf 文件从容器中复制到宿主机中：

```
root@df21774abed5:/etc/nginx# cp default.conf default.conf.bak # 备份该配置文件
root@df21774abed5:/etc/nginx# exit; # 退出 nginx 容器
exit
[lighthouse@centos]~% docker cp nginx:/etc/nginx/conf.d/default.conf . # 将容器中的 default.conf 文件复制到宿主机
[lighthouse@centos]~% ls -al
drwx------  9 lighthouse lighthouse 4096 Oct 17 00:15 .
drwxr-xr-x. 3 root       root       4096 Nov 23  2020 ..
-rw-r--r--  1 lighthouse lighthouse 1181 Oct 16 23:20 default.conf
```

修改 `default.conf` 文件：

```
server {
    listen       80;
    listen  [::]:80;
    server_name  _; # 换成你自己的域名
    # return 301 https://$host$request_uri; # 该行先注释掉，因为还没有证书呢，稍后申请下证书后再取消注释

    location / {
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass <http://172.17.0.1:81/;> # 修改端口号。这个 81 的端口号是上面运行 mediawiki 容器时制定的 81 端口
    }
}

server {
    listen       443 ssl http2;
    listen  [::]:443 ssl http2;
    server_name  _; # 换成你自己的域名

    # ssl on; #如果强制HTTPs访问，这行要打开
    # ssl_certificate /etc/nginx/certs/ruofei.wiki.crt;
    # ssl_certificate_key /etc/nginx/certs/ruofei.wiki.key;
    ssl_certificate    /www/server/panel/vhost/cert/wiki.hi-ruofei.com/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/wiki.hi-ruofei.com/privkey.pem;
    # ssl_session_timeout 5m;
    # ssl_protocols SSLv2 SSLv3 TLSv1.2; # 指定密码为openssl支持的格式
    # ssl_ciphers HIGH:!aNULL:!MD5; # 密码加密方式
    # ssl_prefer_server_ciphers on; # 依赖SSLv3和TLSv1协议的服务器密码将优先于客户端密码

    location / {
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass <http://172.17.0.1:81/;> # 修改端口号。这个 81 的端口号是上面运行 mediawiki 容器时制定的 81 端口
    }
}
```

修改后再将其复制到 `nginx` 容器中：

```bash
docker cp ./default.conf nginx:/etc/nginx/conf.d
```

修改 `nginx` 配置文件，别忘了重启容器：

```bash
docker restart nginx
```

等待 `nginx` 容器重启，之后在浏览器中访问 `http://your_domain` 即可看到 MediaWiki 的安装界面。
