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
keywords:
  - TypeScript
  - TypeScript Utility Types
  - TypeScript 实用类型
  - TS
  - TS Utility Types
  - TS 实用类型
  - TypeScript Utility Types - Record
  - TypeScript 实用类型 - Record
  - TS Utility Types - Record
  - TS 实用类型 - Record
---

`Record<Keys, Type>` 可构造一个对象类型，其属性 key 是 key，属性值是类型。该应用程序可用于将一个类型的属性映射到另一个类型。

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

类型定义中有一个操作符 `keyof`，要理解 `Record<Keys, Type>` 如何工作，这个知识点是必须要知道的。

`keyof` 该操作符可以获取一个类型的所有键值，返回一个联合类型：

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

由上面的示例可知：`keyof` 操作符获取一个类型中所有 key，并返回这些 key 的联合类型。





为经过什么 中Type>` 要稍微复杂一些，下面先通过一个例子初步理解一下：

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

