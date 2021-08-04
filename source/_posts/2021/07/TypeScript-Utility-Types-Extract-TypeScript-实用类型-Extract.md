---
title: 'TypeScript Utility Types - Extract: TypeScript 实用类型 - Extract'
abbrlink: 568ce723
date: 2021-07-04 10:41:38
updated:
categories:
  - 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
---

本篇介绍 TypeScript 实用类型中的 `Extract` 类型。看字面意思，`Extract` 是指**取出**、**挑出**的意思，`Extract` 会挑选出传入的两个联合类型中相同的成员，将这些相同的成员构造成一个新类型，构造的新类型有可能是联合类型，也有可能是其他任何类型。

下面是一个简单的例子：

```typescript
type U1 = "a" | "b" | "c";
type U2 = "a" | "f";
type T0 = Extract<U1, U2>;
```

<!-- more -->

上面代码中定义了两个联合类型 `U1` 和 `U2`，这两个联合类型中有一个相同的成员 `"a"`，`Extract` 会将该成员 `"a"` 取出来构造一个新类型。构造的新类型 `T0` 等价于下面的类型：

```typescript
// 通过 `Extract` 构造了一个新的字符串类型 `NewT0`
type NewT0 = "a";
```

如果在两个联合类型中，存在多个相同的成员（两个及以上）时，`Extract` 会将这些成员构造成一个新的**联合类型**，下面是另一个例子：

```typescript
type U3 = "a" | "b" | "c";
type U4 = "a" | "f" | "c";
type T1 = Extract<U3, U4>;
```

上面两个联合类型 `U3` 和 `U4` 中存在多个相同的成员：`"a"` 和 `"c"`，`Extract` 会将他们构造成一个新的联合类型，联合类型 `T1` 与下面的类型是等价的：

```typescript
type NewT1 = "a" | "c";
```

对初学者来说，还有一种情况容易受到误导，看下面的例子：

```typescript
type U5 = string | number | (() => void);
type U6 = Function;
type T2 = Extract<U5, U6>; // type T2 = () => void;
```

从字面量的角度来看，`U5` 和 `U6` 两个联合类型中并没有相同的成员，但是从类型角度来说 `() => void` 表示的是一个函数，它的类型与 `Function` 是等价的，因此构造出的新类型 `T` 是一个函数。

了解了 `Extract` 的用法，下面看一下它的类型定义源码，`Extract` 在实现上非常简单，源码如下：

```typescript
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

通过 `Extract` 的源码我们不难发现，`Extract` 从 `T` 类型中取出 `T` 和 `U` 类型中共有的成员来构造一个新类型，如果其中没有共有成员，将返回 `never` 类型。
