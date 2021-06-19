---
title: "TypeScript:实用类型(Utility Types)"
abbrlink: 36c9a32b
date: 2021-06-17 17:43:46
categories: 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
updated:
---

TypeScript 提供了几种实用类型，以方便常见的类型转换。这些实用类型可在全局范围内实用。

<!-- more -->

## `Partial<Type>`

`Partial<Type>` 可将一个类型中所有属性转换为可选属性。假设我们有一个定义 `user` 的类型，如下：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
};
```

经 `Partial<Type>` 转换后得到：

```typescript
type PartialUser = Partial<User>;
const partialUser: PartialUser = {
  /** `name` 属性是可选的 */
  name: 'Olive',
  /** `age` 属性是可选的 */
  age: 18,
  /** `gender` 属性是可选的 */
  gender: 'female',
}
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

## `Required<Type>`

`Required<Type>` 类型与 `[Partial<Type>](#Partial-lt-Type-gt)` 类型的作用相反，`Required<Type>` 可将一个类型中的可选属性转换为必选属性。仍然以 `User`  类型为例：

```typescript
type User = {
  name: string;
  age?: number;
  gender: string;
}
```

`User` 类型中的 `age` 属性是可选属性，当经过 `Required<Type>` 转换后，该属性会被转换成必选属性：

```typescript
type RequiredUser = Required<User>;

const requiredUser: RequiredUser = {
  name: 'Olive',
  /** `age` 属性由可选转成了必选 */
  age: 18,
  gender: 'female'
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

## `Readonly<Type>`

`Readonly<Type>` 可将一个类型中所有属性转换为**只读**属性。以 `User` 类型为例：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
}
```

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
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

- 遍历类型 `T`，将类型 `T` 中的属性作为 key；
- 在属性 key 前面加 `readonly` 修饰符，使其转换为只读属性；
- 只读属性的值为 `T` 类型中对应属性的值，即 `T[P]`。

[Playground Link](https://www.typescriptlang.org/zh/play?#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHMBubXAus-AVyICMkncobPABMk5SjXpMAvpkyhIUAEoQCwgPZ4ANiHhJUy1Ru0gAPHsQA+JpgDGmylERHNOi+RVrXuhMjRYBAHoAKmCoAANCEnCoQD0dQHIDQHozQCvlQG-owBC3KGDA5hwo9gByAHktagA3CAKAGlyoELDw1ggYhJSMrJyBJvIARgAOGqDQiKFRRBaktMzs2tGxKAKAMwgiAi1KmtlMQMCoQFPowFmTQB15QFg5QGqIwEFFQA7owBh-wAO1QC45COcvEwsYwFo5bd3MyOJmuLxQBPumdADbxgCNjB6hNKhBKAIAZvs8XG9fJ90oABI0AkOYJQC-CW10giXsY3L4AHT5AwFABSBFsAGsCgwgA)

## `Record<Keys, Type>`

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

上面代码中，定义了 `张三` 的一些个人信息（`ZhangSanInfo`），包括：`name`（姓名）、`age`（年龄）和 `gender`（性别），假设他有 3 个不同的昵称：`san_ge`（三哥）、`xiao_san`（小三）、`san_zi`（三子）。因为这三个昵称都是指 `张三` 这个人，所以这三个昵称上都应该有 `张三` 身上的属性。

## `Pick<type, Keys>`

## `Omit<Type, Keys>`

## `Exclude<Type, ExcludeUnion>`

## `Extract<Type, Union>`

## `NonNullable<Type>`

## `Parameters<Type>`

## `ConstructorParameters<Type>`

## `ReturnType<Type>`

## `InstanceType<Type>`

## `ThisParameterType<Type>`

## `OmitThisParameter<Type>`

## `ThisType<Type>`

## `Uppercase<StringType>`

see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype

## `Lowercase<StringType>`

see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#lowercasestringtype

## `Capitalize<StringType>`

see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype

## `Uncapitalize<StringType>`

see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uncapitalizestringtype
