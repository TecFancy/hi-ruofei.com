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

## `Partial<Type>`

`Partial<Type>` 可将一个类型中所有属性转换为可选属性。

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

假设我们有一个定义 `user` 的类型，如下：

```typescript
type User = {
  name: string;
  age: number;
  gender: string;
}
```

经 `Partial<Type>` 转换后得到：

```typescript
type UserOptional = Partial<User>;

// UserOptional 的结果如下
type UserOptional = {
  name?: string | undefined;
  age?: number | undefined;
  gender?: string | undefined;
}
```

## `Required<Type>`

## `Readonly<Type>`

## `Record<Keys, Type>`

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
