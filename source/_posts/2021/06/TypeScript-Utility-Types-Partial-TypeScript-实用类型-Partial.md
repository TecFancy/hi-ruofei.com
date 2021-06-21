---
title: "TypeScript Utility Types - Partial: TypeScript 实用类型 - Partial"
abbrlink: d31a997b
date: 2021-06-20 01:52:51
categories:
  - TypeScript
tags:
  - "TypeScript: Utility Types"
  - "TS: Utility Types"
  - "TypeScript: 实用类型"
  - "TS: 实用类型"
updated:
---

`Partial<Type>` 可将一个类型中所有属性转换为可选属性。假设我们有一个 `user` 的类型，如下：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};
```

经 `Partial<Type>` 转换后得到：

<!-- more -->

```typescript
type PartialUser = Partial<User>;
const partialUser: PartialUser = {
  /** `name` 属性是可选的 */
  name: "Olive",
  /** `age` 属性是可选的 */
  age: 18,
  /** `gender` 属性是可选的 */
  gender: "female",
};
```

转换后的 `PartialUser` 类型与下面的类型是等价的：

```typescript
type PartialUser = {
  name?: string | undefined;
  age?: number | undefined;
  gender?: string | undefined;
};
```

那么 `Partial<Type>` 是如何转换类型的呢？下面是它的源码：

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- 遍历类型 `T`，将类型 `T` 中的属性作为 key；
- 在属性后面加 `?` 使其变为可选的属性；
- 可选属性的值为 `T` 类型中对应属性的值，即 `T[P]`。

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHMBubXAus-AVyICMkncobPABMk5SjXpMAvpkyhIUAAoFEwagQA28JKmWr1WgDw7EAPiaYAxgHs8lKGAMbtCRORVqXpvVgEB6ACpAqAADQhJQqEA9HUByA0B6M0B75UBIBMAQtyhA-2YcCPYAcgB5TWoANwg8gBpsqCCQ0NYIKLiktIysgQbyAEYADiqA4LChUUQmhJT0zOrhsSg8gDMIIi1yqukgA)

{% ggad-fluid %}

