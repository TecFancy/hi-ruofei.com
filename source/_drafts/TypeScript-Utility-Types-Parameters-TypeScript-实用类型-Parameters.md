---
title: 'TypeScript Utility Types - Parameters: TypeScript 实用类型 - Parameters'
categories:
  - 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
keywords:
  - TypeScript Utility Types - Parameters
  - TypeScript 实用类型 - Parameters
abbrlink: 7b732aea
date: 2021-11-01 10:28:13
updated:
---

本文介绍 TS 内置类型 `Parameters`。

## 定义

下面是 TS 官网给出的 `Parameters` 类型的定义：

> Constructs a tuple type from the types used in the parameters of a function type `Type`.

`Parameters` 类型的定义中有两个需要关注的点：

1. `Parameters` 会将指定的类型构造成元组类型（tuple type）；
2. `Parameters` 的目标类型是函数类型。

<!-- more -->

下面是 `Parameters` 类型的实现：

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

通过上面这段代码我们可以这样理解 `Parameters` 的作用：`Parameters` 类型用于将函数类型的参数构造成元组。

## 示例

1. 

2. 

3. 

4. 

5. 

6. 

7. 

8. 

9. 

10. 

11. 

12. 

13. 

14. 

    

```typescript
type T0 = Parameters<() => {}>;
// []

type T1 = Parameters<(name: string) => {}>;
// [string]

type T2 = Parameters<<T>(arg: T) => T>;
// [unknown]

declare function f(arg: { age: number; gender: string }): void;
type T3 = Parameters<typeof f>;
// [{age: number, gender: string}]

type T4 = Parameters<any>;
// unknown[]

type T5 = Parameters<never>;
// never

type T6 = Parameters<string>;
// never
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
// 类型“string”不满足约束“(...args: any) => any”。

type T7 = Parameters<Function>;
// never
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//   Type 'Function' provides no match for the signature '(...args: any): any'.
// 类型“Function”不满足约束“(...args: any) => any”。
//   类型“Function”提供的内容与签名“(...args: any): any”不匹配。
```



