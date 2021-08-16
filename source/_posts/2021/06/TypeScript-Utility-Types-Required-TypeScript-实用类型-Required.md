---
title: "TypeScript Utility Types - Required: TypeScript 实用类型 - Required"
abbrlink: 64ba61b9
date: 2021-06-20 16:34:04
updated:
categories: 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
---

`Required<Type>` 类型与 `[Partial<Type>](#Partial-lt-Type-gt)` 类型的作用相反，`Required<Type>` 可将一个类型中的可选属性转换为必选属性。以 `User` 类型为例：

```typescript
type User = {
  name: string;
  age?: number;
  gender: string;
};
```

<!-- more -->

`User` 类型中的 `age` 属性是可选属性，当经过 `Required<Type>` 转换后，该属性会被转换成必选属性：

```typescript
type RequiredUser = Required<User>;

const requiredUser: RequiredUser = {
  name: "Olive",
  /** `age` 属性由可选转成了必选 */
  age: 18,
  gender: "female",
};
```

下面是 `Required<Type>` 的源码：

```typescript
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

注意到属性后的 `-?` 了吗？意思是：去除该属性的可选属性，使其转换为必选的属性。

[Playground Link](https://www.typescriptlang.org/zh/play?ssl=16&ssc=3&pln=7&pc=1#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHMBubXAus-AVyICMkncobPABMk5SjXpMAvpkyhIUAEoQAjh2qIIw+ElTK1GrcIA8uxAD4mmAMYB7PJShb1m7efIrXx8-qwCAegAqIKgAA0ISMKhAPR1AcgNAejNAUf1ASATAELcoIIDmHEj2AHIAeQAbagA3CHyAGhyoYNCw1gho+OT0zOyBJvIARgAOGsCQ8KFRRBbE1Iys2tGxKHyAMwgiAmLKzGkGIA)

