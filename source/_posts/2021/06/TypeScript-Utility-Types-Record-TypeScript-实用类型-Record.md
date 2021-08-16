---
title: 'TypeScript Utility Types - Record: TypeScript 实用类型 - Record'
abbrlink: 5a81d7c
date: 2021-06-21 16:26:18
updated:
categories: 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
---

`Record<Keys, Type>` 可构造一个对象类型，其属性 key 是 key，属性值是类型。该类型可用于将一个类型的属性映射到另一个类型。

假设我们有一个 `User` 类型，如下：

<!-- more -->

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
}
```

经 `Record<Keys, Type>` 转换后得到：

```typescript
type NewUser = Record<"name" | "age" | "gender", string>;
const newUser: NewUser = {
  name: "Olive",
  age: "18", // 注意这里
  gender: "female",
};
```

转换后的 `NewUser` 类型与下面的类型是等价的：

```typescript
type User = {
  name: string;
  age: string;
  gender: string;
}
```

最开始定义的 `User` 类型中 `age` 属性为 `number` 类型，为什么经过 `Record<Keys, Type>` 转换后 `age` 属性变为 `string` 类型了呢？下面根据 `Record<Keys, Type>` 的类型定义来分析一下：

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

类型定义中有一个操作符 `keyof` 和一个关键字 `in`，要理解 `Record<Keys, Type>` 如何工作，这两个知识点是必须要知道的。

- `keyof` 操作符可以获取一个类型的所有键，返回一个这些键的联合类型：

  ```typescript
  type User = {
    name: string;
    age: number;
    gender: string;
  };
  type UserPropType = keyof User;
  ```

  上面代码中 `UserPropType` 的类型等价于下面的类型：

  ```typescript
  type UserPropType = 'name' | 'age' | 'gender';
  ```

  由上面的示例可知：`keyof` 操作符获取一个类型中所有 key，并返回这些 key 的联合类型。所以上面 `Record` 的用法还可以改写成这样：

  ```typescript
  type NewUser = Record<keyof User, string>;
  ```

- `in` 是一个 `类型关键字`，可以对联合类型进行遍历，只可用在 `type` 关键字下。

  ```typescript
  type Person = {
    [key in 'name' | 'age']: number
  }
   
  // Person => { name: number; age: number; }
  ```

知道了 `keyof` 操作符和 `in` 关键字的作用，`Record<Keys, Type>` 的类型定义也就清楚了：

- 类型 `K` 继承自联合类型 `keyof any`；
- 通过关键字 `in` 遍历联合类型 `K`，并将遍历的结果作为 key；
- key 的值是类型 `T`。

现在回头看 `Record<Keys, Type>` 的定义是不是就理解了呢？欢迎在下方留言交流。

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHMBubXAus-AVyICMkncobPABMk5SjXpMAvpjmhIUAHIQA7vCSooAJQgBjAPaJhAHgDWEEAYBmsBIgA0FKrToA+JpkN5K+NRsRyFXV7LSwcQhJyACIAeQAbagA3CGiHZlZ2aIBGAA40qAB6QqhAC5tAeENATfjAGcTmIVFAqGjrCCICeNT06QYgA)



