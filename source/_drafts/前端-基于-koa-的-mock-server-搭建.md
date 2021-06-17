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

首先确保你已在本地计算机中安装了 Node.js，参考 [这里](/post/ad163972/) 安装。我们使用 git 作为项目管理工具，git 的安装请参考 [这里](https://git-scm.com/downloads)。

## 初始化项目

首先，在任意目录下新建一个文件夹 `koa-mock-server`，终端下 `cd` 到该文件夹下执行：

```bash
$ mkdir mock-server && cd mock-server
$ npm init -y && git init
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

- `node_modules/`：项目中 `npm` 包的安装目录
- `src/`：项目源码目录
- `src/index.js`：项目入口文件
- `src/api/`: 存放 `api` 的目录
- `src/api/index.js` 所有 `api` 都会通过该文件导出
- `src/routes/`：存放所有路由的目录
- `src/routes/index.js`：所有路由都会通过该文件导出
- `.gitignore`：使用 `git` 管理项目版本，改文件中保存了项目中要忽略的文件夹及文件
- `yarn.lock`：使用 `yarn` 作为项目的包管理器，这是安装依赖后生成的包依赖图
- `nodemon.json`：`nodemon` 是一个 `node` 热更新的工具，详见 [说明文档](https://www.npmjs.com/package/nodemon)
- `package.json`：项目版本、描述、第三方依赖等信息都存放在该文件中

## 小试牛刀

Koa 依赖 **node v7.6.0** 或 ES2015 及更高版本和 async 方法支持。项目根目录下安装 koa：

```bash
$ yarn add koa
```

我们使用 git 管理项目时，通常会将 `node_modules` 文件夹忽略，编辑 `.gitignore` 文件：

```none
# .gitignore
node_modules

```

在 `src/index.js` 入口文件中引入 koa 并启动一个简单的 http server：

```javascript
const Koa = require("koa");

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello Koa.";
});
app.listen(10086);
```

在终端工具中，通过 node 运行该文件：

```bash
$ node ./src/index.js
```

打开浏览器，访问 http://localhost:10086 ，你将会看到这样的页面：

![Hello koa](post/2673865c/Hello-koa.png)
