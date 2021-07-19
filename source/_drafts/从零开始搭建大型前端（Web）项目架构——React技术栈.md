---
title: 从零开始搭建大型前端（Web）项目架构——React技术栈
date: 2021-07-19 23:04:35
updated:
categories:
  - 前端
tags:
  - 前端架构
keywords:
  - 前端开发
  - 前端架构体系
---

## 初始化项目目录

创建 `react-project` 文件夹，`cd` 到该目录，使用 `npm` 初始化项目：

```bash
$ npm init -y
```

正常情况下，使用 `npm init` 初始项目目录时，会通过一个终端交互界面填写项目的基础信息，而参数 `-y` 则会省略这个交互步骤，使用其内置的默认行为来初始化项目。

初始化后的项目结构如下：

```
|- react-project/
  |- package.json
```

根目录下的 `package.json` 文件便是 `npm init` 执行后生成的项目配置文件，使用编辑器打开该文件，内容如下：

```json
{
  "name": "react-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- `name`：该属性表示项目的名称，在使用 `npm init` 初始化项目时，这个字段的值会取项目文件夹的名称作为项目名。
- `version`：表示项目的初始版本，这里的默认版本为 `1.0.0`。
- `description`：这个字段表示项目的描述信息，默认为空。当项目初始后需要项目作者自己填写该项目的描述。
- `main`：表示该项目的入口文件。在普遍意义上的 Web 项目中，删掉即可，但是当需要发布 npm 包时这个字段是必须的。
- `scripts`：表示项目中的一系列脚本命令。在 Web 项目中，一般区分开发环境、生产环境和测试环境，对应的脚本命令都要写在这个对象中。大家耳熟能详的 `create-react-app` 项目中，就有 `start`、`build`、`test` 等命令，大多数情况下这些脚本命令都是对复杂操作的封装。有些开发者还会借助脚本命令打造一套强大的工作流，能极大提升开发时的体验和效率。关于对脚本命令的使用技巧，有兴趣的朋友可以查阅 npm 文档深入学习，这里不再赘述。之后有时间我会专门写一篇文章分享给大家。
- `keywords`：使用若干关键字描述项目，需要项目所有者按需自行填写。
- `author`：这里填写项目所有，如有必要可将项目其他贡献者罗列在此。
- `license`：项目的许可证类型，比如常见的 `MIT`。

除了上面提到的这几个属性，`package.json` 文件中还有许多字段，比如 `dependencies` 和 `devDependencies` 等，在后面搭建项目架构时会逐一讲到。
