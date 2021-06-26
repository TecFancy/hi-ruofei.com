---
title: 'TypeScript Utility Types - Pick: TypeScript 实用类型 - Pick'
abbrlink: bdb49a56
date: 2021-06-25 17:31:10
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
  - TypeScript Utility Types - Pick
  - TypeScript 实用类型 - Pick
  - TS Utility Types - Pick
  - TS 实用类型 - Pick
---

`Pick<Type, Keys>` 可从类型中选取一组属性键来构造类型。以下面的 `User` 类型为例：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};
```

<!-- more -->

经 `Pick<Type, Keys>` 转换后得到：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};

type PickUser = Pick<User, 'name' | 'age'>;

// `PickUser` 类型相对于 `User` 类型少了 `gender` 属性
const pickUser: PickUser = {
  name: 'Olive',
  age: 18,
};
```

转换后的 `PickUser` 类型与下面的类型是等价的：

```typescript
type PickUser = {
  name: string;
  age: number;
};
```

那么，`Pick<Type, Keys>` 是如何转换类型的呢？我们通过它的类型定义来分析一下：

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

结合上面的示例，`Pick` 类型定义中的泛型 `T` 就是我们刚才定义的类型 `User`，后面的 `K extends keyof T` 则表示泛型 `K` 继承自联合类型 `keyof T`，由此可以得出泛型 `K` 是一个联合类型。

通过关键字 `in` 来遍历联合类型 `K`，将联合类型中的每个成员作为 key，通过方括号语法访问类型 `T` 中该成员对应的值，即 `T[P]`。

以上就是 `Pick<Type, Keys>` 的用法和类型定义的解析，欢迎在下方留言交流。

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKClAdgQwFsIAuKOYRAS1wHMBubKfW0vAV0ICMlGdXcAEyRkK1OowC+jTKEhQAClQDGAa3hJUilaoA8GxABooAcgLETUAD6mWEEwD4ZAemdQABkrUH3UQN4+gNHqgB9ugJ-agHFyHj7+AYCIOoBhch4Cwoi+gHo6gOQGmMoA9rgUUGA6BmRe6gjIaFg45mwmAPIANlQAbvaGTHZkAIwAHO3SmEA)

