---
title: TypeScript 类型每日一学：原始值
categories:
  - 前端
tags:
  - TypeScript Types
keywords:
  - TypeScript
  - TS
  - TypeScript Types
  - TypeScript 类型
abbrlink: b0832411
date: 2021-07-11 10:30:56
updated:
---

JavaScript 中有三个原始值：`string`、`number` 和 `boolean`。JS 的每个原始值在 TS 中都有与之相对应的类型。这些类型的名称与在 JS 中对这些类型的值使用 `operator` 运算符的结果相同：

- `string`：相当于字符串类型，比如：`Hello, world.`。
- `number`：表示数字类型，比如：`42`。因为 JS 没有特殊的运行时数字值，因此这里没有与之等价的 `int` 或 `float`——不论整数还是小数，在 TS 中统一称作为数字类型，即 `number` 类型。
- `boolean`：布尔类型有两个值，分别是 `true` 和 `false`，与 JS 的布尔值是相同的。

下面是关于这些类型的几个简单例子：

```typescript
type T0 = string; // 定义一个字符串类型 `T0`
const str: T0 = 'Hello, world.';

type T1 = number; // 定义一个数字类型 `T1`
const num: T1 = 42;

type T2 = boolean; // 定义一个布尔类型 `T2`
const bool: T2 = true;
```

