---
title: NextJS 入门指南
date: 2022-11-04 09:58:23
updated:
categories: JavaScript
tags:
keywords:
  - Next.js
  - JavaScript
---

系统要求：

1. 操作系统：MacOS/Windows (支持 WSL)/Linux
2. Node.js：>= 12.22.0

## 自动设置

推荐使用 `create-next-app` 来自动设置 NextJS 应用：

```bash
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

如果想在创建项目时加入对 TypeScript 的支持，可在命令后面加上 `--typescript` 参数：

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --typescript
```

项目创建成功后：

1. 运行 `npm run dev` 或 `yarn dev` 或 `pnpm dev` 启动项目；
2. 在浏览器中访问 http://localhost:3000；
3. 编辑 `pages/index.js` 文件后，在浏览器中实时查看编译结果（支持热更新）。

## 手动设置

在项目中安装 `next`，`react` 和 `react-dom`：

```bash
npm install next react react-dom
# or
yarn add next react react-dom
# or
pnpm add next react react-dom
```

在的 `package.json` 文件中加入下面的脚本命令：

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

不同的脚本命令对应不同的开发阶段：

- `dev` - 开发环境下启动 Next.js
- `build` - 生产环境打包 Next.js
- `start` - 生产环境下启动 Next.js
- `lint` - 设置 Next.js 内置的 ESLint 配置

在项目根目录下分别创建两个文件夹 `pages` 和 `public`：

- `pages` - Next.js 会将 `pages` 文件夹下的每个文件当做一个路由来处理，路由名对应文件名。例如： `pages/about.js` 将映射为 `/about`
- `public` - 存储静态资源，如图像、字体等。`public` 目录下的文件可以在项目中被引用，引用地址为根路径（/）

Next.js 中，每个页面（pages 目录下）都是一个 React 组件，文件以 `.js`、`.ts`、`.jsx` 或 `.tsx` 后缀结尾。通过特定的文件名命名格式，我们甚至可以实现动态路由的功能，比如：`[pid].tsx`。

以上，就是 Next.js 最基本的入门指南了。
