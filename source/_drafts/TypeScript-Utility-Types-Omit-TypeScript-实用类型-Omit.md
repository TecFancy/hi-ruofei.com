---
title: 'TypeScript Utility Types - Omit: TypeScript 实用类型 - Omit'
abbrlink: 37f6eaa
date: 2021-06-26 10:44:13
updated:
categories:
  - 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
keywords:
  - TypeScript
  - TypeScript Utility Types
  - TypeScript 实用类型
  - TS
  - TS Utility Types
  - TS 实用类型
  - TypeScript Utility Types - Omit
  - TypeScript 实用类型 - Omit
  - TS Utility Types - Omit
  - TS 实用类型 - Omit
---

`Omit<Type, Keys>` 从类型中选取所有属性，然后删除键来构造类型。以下面的 `User` 类型为例：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};
```

<!-- more -->

经 `Omit<Type, Keys>` 类型转换后得到：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};

// 删除 `User` 类型中的 `age` 和 `gender` 属性
// 只剩下了 `name` 属性
type OmitUser = Omit<User, 'age' | 'gender'>;

const omitUser: OmitUser = {
  name: 'Olive',
};
```

转换后的 `OmitUser` 类型与下面的类型是等价的：

```typescript
type OmitUser = {
  name: string;
};
```

那么，`Omit<Type, Keys>` 是如何转换类型的呢？我们通过它的类型定义来分析一下：

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

`Omit<Type, Keys>` 源码的类型定义中有几点需要注意：

- `K extends keyof any`：这段代码表示泛型 `K` 继承自联合类型 `keyof any`；
- `Pick` 是 TypeScript 中作用于全局的实用类型[^1];
- `Exclude` 是 TypeScript 中另一个作用于全局的实用类型[^2]；

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKClAdgQwFsIAuKOYRAS1wHMBubKfW0vAV0ICMlGdXcAEyRkK1OowC+jTKEhQA8oSrB4SVIuXAAPGsQAaKAHIWEI1AA+xgcMRGAfDIDGAe1wUoLrXrJKVejSwcAmIyIwUAGyoANzN9TGkgA)

[^1]: [TypeScript Utility Types - Pick: TypeScript 实用类型 - Pick](/post/bdb49a56/)

[^2]: TODO
