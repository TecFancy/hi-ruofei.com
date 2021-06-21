---
title: 'TypeScript Utility Types - Record: TypeScript 实用类型 - Record'
abbrlink: 5a81d7c
date: 2021-06-21 16:26:18
categories: 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
updated:
---

`Record<Keys, Type>` 要稍微复杂一些，下面先通过一个例子初步理解一下：

```typescript
type ZhangSanInfo = {
  name: string;
  age: number;
  gender: string;
};

type penNames = 'san_ge' | 'xiao_san' | 'san_zi';

const zhangSan: Record<penNames, ZhangSanInfo> = {
  san_ge: {name: '张三', age: 18, gender: 'male'},
  xiao_san: {name: '张三', age: 18, gender: 'male'},
  san_zi: {name: '张三', age: 18, gender: 'male'},
};
```

<!-- more -->

上面代码中，定义了 `张三` 的一些个人信息（`ZhangSanInfo`），包括：`name`（姓名）、`age`（年龄）和 `gender`（性别）。假设他有 3 个不同的昵称：`san_ge`（三哥）、`xiao_san`（小三）、`san_zi`（三子），因为这三个昵称都是指 `张三` 这个人，所以这三个昵称上都应该有 `张三` 身上的属性。

{% ggad-fluid %}

