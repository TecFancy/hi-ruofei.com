---
title: NextJS 添加 TypeScript
date: 2022-11-14 13:54:15
updated:
categories:
tags:
keywords:
  - Next.js
  - JavaScript
---

在 NextJS 项目中要添加对 TypeScript 的支持，有两种方式：

1. 官方脚手架；
2. 手动安装。

<!-- more -->

## 官方脚手架

在创建新的 NextJS 项目时，可方便的通过官方脚手架来获得对 TypeScript 的支持。只需在脚手架命令后加一个 `--ts` 或 `--typescript` 参数即可，如下：

```bash
npx create-next-app@latest --ts
# or
yarn create next-app --typescript
# or
pnpm create next-app --ts
```

在创建新项目时，这种方式是最简单。

若是在现有的 NextJS 项目中添加 TypeScript，就只能手动安装了。

## 手动安装

首先，在项目根目录创建 TypeScript 的配置文件 `tsconfig.json`：

```bash
$ touch tsconfig.json
```

然后，执行 `npm run dev` 或 `yarn dev`，NextJS 将自动配置 TypeScript 的默认值到 `tsconfig.json` 文件中：

```bash
$ yarn dev
yarn run v1.22.17
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
It looks like you're trying to use TypeScript but do not have the required package(s) installed.
Installing dependencies

If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files in your pages directory).


Installing devDependencies (yarn):
- typescript
- @types/react
- @types/node
...
wait  - compiling / (client and server)...
event - compiled client and server successfully in 119 ms (207 modules)
```

除此之外，NextJS 还会在项目根目录额外创建一个 `next-env.d.ts` 文件，这个文件默认忽略提交并且不要手动修改，因为这个文件在项目编译时可能随时被更改。而若要提供全局类型，可以新增一个 `additional.d.ts` 文件用来提供项目全局类型。不要忘记将 `additional.d.ts` 文件添加到 `tsconfig.json` 配置文件中，通常是添加到 `include` 数组中即可。

```json
{
  "include": ["next-env.d.ts", "additional.d.ts", "**/*.ts", "**/*.tsx"]
}
```

以上，是在 NextJS 项目中添加 TypeScript 的两种方式。
