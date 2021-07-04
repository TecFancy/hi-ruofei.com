---
title: 'TypeScript Utility Types - NonNullable: TypeScript 实用类型 - NonNullable'
abbrlink: 9a86a6f1
date: 2021-07-04 14:30:35
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
  - TypeScript Utility Types - NonNullable
  - TypeScript 实用类型 - NonNullable
  - TS Utility Types - NonNullable
  - TS 实用类型 - NonNullable
---

本篇介绍 TypeScript 实用类型中的 `NonNullable<Type>` 类型。`NonNullable` 会从传入的类型中将 `null` 和 `undefined` 排除，之后把剩下的成员构造成一个新类型。

下面是一个简单的例子：

```typescript
type U1 = string | number | undefined;
type T0 = NonNullable<U1>;
```

<!-- more -->

上面的代码中定义了一个名为 `U1` 的联合类型，`NonNullable` 会将该类型中的 `undefined` 排除，再将剩余的成员构造成新的类型 `T0`，类型 `T0` 等价于下面的类型：

```typescript
type NewT0 = string | number;
```

再看一个包含成员 `null` 的例子：

```typescript
type U2 = string[] | null | undefined;
type T1 = NonNullable<U2>;
```

上面的类型 `U2` 中包含成员 `null`，因此 `NonNullable` 会把 `null` 和 `undefined` 都排除掉，构造的新类型便是 `string[]`。类型 `T1` 等价于下面的类型：

```typescript
type NewT1 = string[];
```

`NonNullable` 的类型定义源码中通过 `extends` 实现，源码如下：

```typescript
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

`never` 表示从来不会出现的值的类型，因此联合类型的当成员为 `null` 或 `undefined` 时，`NonNullable` 会将他们排除，只留下联合类型中的其他成员，通过保留下来的成员构造新的类型，也就是源码中的 `T` 类型。

