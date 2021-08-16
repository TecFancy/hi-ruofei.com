---
title: 'TypeScript Utility Types - Exclude: TypeScript 实用类型 - Exclude'
abbrlink: fca5d737
date: 2021-06-26 15:17:57
updated:
categories:
  - 前端
tags:
  - TypeScript
  - TypeScript:Utility Types
  - TypeScript:实用类型
---

`Exclude<Type, ExcludeUnion>` 通过排除联合类型中的指定成员来构造新类型。

```typescript
type Letter = 'a' | 'b' | 'c';
type T0 = Exclude<Letter, 'a'>;
```

上例代码中的类型 `T0` 等价于下面的写法：

<!-- more -->

```typescript
type T0 = 'b' | 'c';
```

在这个例子中，`Exclude` 将联合类型 `Letter` 中的成员 `a` 排除掉，得到了一个叫 `T0` 的联合类型。最终在联合类型 `T0` 中，只有成员 `b` 和 成员 `c`。

那么，`Exclude<Type, ExcludeUnion>` 是如何排除类型成员的呢？下面我们通过它的类型定义文件分析一下：

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

`T extends U ? nver : T` 类似于 JavaScript 中的三目运算符，这是 TypeScript 2.8 中引入的**条件类型**[^1]，意思是：如果 `T` 类型是 `U` 类型的子类型的话，返回 `never`[^2]，否则返回 `T` 类型。通过刚才的例子我们不难发现，`Exclude` 就是将前面的类型与后面的类型对比，过滤出前面联合类型中独有的成员。

`Exclude` 除了可以排除联合类型中的字符串成员，还可以过滤函数成员：

```typescript
type MyUnion = 'a' | 'b' | (() => void);
type T2 = Exclude<MyUnion, Function>;

// `T2` 类型等价于下面的 `T3` 类型
type T3 = 'a' | 'b';
```

如果是两个联合类型呢？

```typescript
type U1 = 'a' | 'b' | 'c';
type U2 = 'b' | '5' | 'c';
type U3 = Exclude<U1, U2>;

// `U3` 类型等价于下面的 `U4` 类型
type U4 = 'a';
```

`U3` 类型的结果可能让人疑惑，看上去 `U1` 类型并不是继承自 `U2` 类型，最后为什么将类型 `U1` 中的成员 `b` 和成员 `c` 过滤掉了呢？首先我们注意到 `U1` 和 `U2` 类型都是联合类型，换句话说 `U1` 类型有可能是 `'a'`，有可能是 `'b'`，也有可能是 `'c'`。显然成员 `'a'` 没有继承自 `U2` 类型，而成员 `'b'` 和成员 `'c'` 分别继承自类型 `U2`，所以，最终 `Exclude` 将 `U1` 类型中的成员 `'b'` 和成员 `'c'` 排除掉，只留下了成员 `'a'`。

[^1]: [TypeScript 条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
[^2]: [TypeScript `never` 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
