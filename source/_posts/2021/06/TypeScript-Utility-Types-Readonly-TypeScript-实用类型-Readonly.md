---
title: 'TypeScript Utility Types - Readonly: TypeScript 实用类型 - Readonly'
abbrlink: ed3ec8e0
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
  - TypeScript Utility Types - Readonly
  - TypeScript 实用类型 - Readonly
  - TS Utility Types - Readonly
  - TS 实用类型 - Readonly

---

`Readonly<Type>` 可将一个类型中所有属性转换为**只读**属性。以 `User` 类型为例：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
}
```

<!-- more -->

经 `Readonly<Type>` 转换后得到：

```typescript
type ReadonlyUser = Readonly<User>;
const readonlyUser: ReadonlyUser = {
  /** `name` 属性是只读的 */
  name: 'Olive',
  /** `age` 属性是只读的 */
  age: 18,
  /** `gender` 属性是只读的 */
  gender: 'female',
}
```

转换后的 `ReadonlyUser` 类型与下面的类型是等价的：

```typescript
type ReadonlyUser = {
  readonly name: string;
  readonly age: number;
  readonly gender: string;
};
```

`Readonly<Type>` 是如何转换类型的呢？

```typescript
/** * Make all properties in T readonly */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- 遍历类型 `T`，将类型 `T` 中的属性作为 key；
- 在属性 key 前面加 `readonly` 修饰符，使其转换为只读属性；
- 只读属性的值为 `T` 类型中对应属性的值，即 `T[P]`。

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHMBubXAus-AVyICMkncobPABMk5SjXpMAvpkyhIUAEoQCwgPZ4ANiHhJUy1Ru0gAPHsQA+JpgDGmylERHNOi+RVrXuhMjRYBAHoAKmCoAANCEnCoQD0dQHIDQHozQCvlQG-owBC3KGDA5hwo9gByAHktagA3CAKAGlyoELDw1ggYhJSMrJyBJvIARgAOGqDQiKFRRBaktMzs2tGxKAKAMwgiAi1KmtlMQMCoQFPowFmTQB15QFg5QGqIwEFFQA7owBh-wAO1QC45COcvEwsYwFo5bd3MyOJmuLxQBPumdADbxgCNjB6hNKhBKAIAZvs8XG9fJ90oABI0AkOYJQC-CW10giXsY3L4AHT5AwFABSBFsAGsCgwgA)

{% ggad-fluid %}
