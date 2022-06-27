---
title: TypeScript
date: 2021.06.26
updated:
keywords:
  - TypeScript
  - TypeScript中文教程
  - TypeScript Utility Types
  - TypeScript实用类型
---

## Utility Types 实用类型

该系列文章整理了 TypeScript 作用于全局的内置实用类型，这些实用类型都是由最基础的 TypeScript 语法编写而成。在开发 TypeScript 应用程序过程中，用好这些内置的实用类型可帮助我们减少业务代码量，还能让我们更容易地写出逻辑复杂的业务类型，同时也可以帮助我们夯实 TypeScript 基础。学好 TypeScript 内置的实用类型是向上进阶的必经之路。

- [`Partial<Type>`](/post/TypeScript-Utility-Types-Partial-TypeScript-实用类型-Partial)：将一个复合类型中的成员设为可选。
- [`Required<Type>`](/post/TypeScript-Utility-Types-Required-TypeScript-实用类型-Required)：将一个复合类型中的成员设为必选。
- [`Readonly<Type>`](/post/TypeScript-Utility-Types-Readonly-TypeScript-实用类型-Readonly)：将一个复合类型中的成员设为只读。
- [`Record<Keys, Type>`](/post/TypeScript-Utility-Types-Record-TypeScript-实用类型-Record)：将一个复合类型中的成员映射到另一个复合类型以构造新类型。
- [`Pick<Type, Keys>`](/post/TypeScript-Utility-Types-Pick-TypeScript-实用类型-Pick)：从一个复合类型中挑选若干属性键来构造新类型。
- [`Omit<Type, Keys>`](/post/TypeScript-Utility-Types-Omit-TypeScript-实用类型-Omit)：从一个复合类型中选取所有属性并通过删除指定的成员来构造新类型。
- [`Exclude<Type, ExcludeUnion>`](/post/TypeScript-Utility-Types-Exclude-TypeScript-实用类型-Exclude)：排除联合类型中的制定成员来构造新类型。
- [`Extract<T, U>`](/post/TypeScript-Utility-Types-Extract-TypeScript-实用类型-Extract)：挑选出传入的两个联合类型中相同的成员，将这些相同的成员构造成一个新类型。
- [`NonNullable<Type>`](/post/TypeScript-Utility-Types-NonNullable-TypeScript-实用类型-NonNullable)：排除联合类型中为 `null` 或 `undefined` 的成员，将剩下的成员构造成新类型。

---
