---
title: "前端:基于 koa 的 mock server 搭建"
categories:
  - 前端
  - Mock Server
abbrlink: 2673865c
date: 2021-06-16 23:12:22
tags:
  - koa
  - server
updated:
---

不知大家在做前端开发时有没有遇到过这样的痛点：项目需求评审后，前后端同事着手开发，当你准备实现一些异步逻辑的时候发现后端同事还没有给到接口。针对这种情况，我们应该怎么做才能保证自己手上的开发进度呢？答案是自己模拟后端的接口，当后端同事写好接口后，我们再将自己模拟的接口替换成后端提供的接口。当然，在自己模拟接口之前应先与后端同事定好数据结构。

目前业内有许多 mock server 的实现，这里先不一一比对，暂时先基于 koa 框架来实现一个。当准备好 mock server 后我们会发现，多数工具提供的 mock server 基本原理大致是一致的。所以，这里我们先搞一个，至于社区的其他方案，大家可以自行实践。

<!-- more -->

## 前提条件

首先确保你已在本地计算机中安装了 Node.js，可以参考 [这里](/post/ad163972/) 安装 Node.js。

## 初始化项目

首先，在任意目录下新建一个文件夹 `mock-server`，终端下 `cd` 到该文件夹下执行：

```bash
$ mkdir mock-server
$ cd mock-server && npm init -y
```

之后，我们约定最终的项目目录结构：

```none
|- mock-server/
  |- node_modules/
  |- src/
    |- api/
      |- index.js
      |- welcome.js
      |- ...
    |- routes/
      |- index.js
      |- welcome-router.js
      |- ...
  |- .gitignore
  |- yarn.lock
  |- nodemon.json
  |- package.json
```

- `node_modules/`：
- `src/`：
- `src/index.js`：
- `src/api/`:
- `src/api/index.js`
- `src/routes/`：
- `src/routes/index.js`：
- `.gitignore`：
- `yarn.lock`：
- `nodemon.json`：
- `package.json`：

## 安装 koa
