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

- [`Partial<Type>`](/post/d31a997b)：将一个复合类型中的成员设为可选。
- [`Required<Type>`](/post/64ba61b9)：将一个复合类型中的成员设为必选。
- [`Readonly<Type>`](/post/ed3ec8e0)：将一个复合类型中的成员设为只读。
- [`Record<Keys, Type>`](/post/5a81d7c)：将一个复合类型中的成员映射到另一个复合类型以构造新类型。
- [`Pick<Type, Keys>`](/post/bdb49a56)：从一个复合类型中挑选若干属性键来构造新类型。
- [`Omit<Type, Keys>`](/post/37f6eaa)：TODO
- [`Exclude<Type, ExcludeUnion>`](/post/fca5d737)：排除联合类型中的制定成员来构造新类型。
