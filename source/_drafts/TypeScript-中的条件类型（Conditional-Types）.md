---
title: TypeScript 中的条件类型（Conditional Types）
categories:
  - 前端
tags:
  - TypeScript
  - TypeScript:Conditional Types
  - TypeScript:条件类型
keywords:
  - TypeScript Conditional Types
  - TypeScript 条件类型
abbrlink: fba56450
date: 2021-11-03 18:07:34
updated:
---

TS 中的条件类型看起来像这样：

```typescript
SomeType extends OtherType ? TrueType : FalseType;
```

下面是一个看起来没啥用的条件类型的用法：

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type T1 = Dog extends Animal ? number : string; // number
type T2 = RegExp extends Animal ? number : string; // string
```

我们注意到 `T1` 和 `T2` 这两个类型都使用了条件类型，不过嘛，这种用法它没啥卵用啊~

那么，在什么情况下能发挥出条件类型的作用呢？答案是：结合泛型一起使用。再来看一个简单的示例：

<!-- more -->

```typescript
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;

function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

上面代码片段中的第 1 行到第 6 行，是我们声明的两个接口：`IdLabel` 和 `NameLabel`。最后的第 12 行，我们声明了一个函数 `createLabel`，为了描述这个函数我们写了整整三个函数重载，目的仅仅是为了让这个 `createLabel` 能支持不同的形参。设想一下，将来某一天需要扩展这个函数的形参类型，那我们岂不是要写很多重载函数？

该怎么避免这些繁琐的函数重载呢？下面我们来看看如何利用条件类型来简化函数重载：

```typescript
type NameOrId<T extends string | number> = T extends string
  ? NameLabel
  : IdLabel;
```

类型 `NameOrId` 接受一个泛型 `T`，泛型 `T` 被约束为 `string` 类型或 `number` 类型（联合类型 `string | number`），当泛型 `T` 为 `string` 类型时，`NameOrId` 为 `NameLabel` 类型；反之，`NameOrId` 就为 `IdLabel` 类型。

类似的，我们可以这样描述 `createLabel` 函数：

```typescript
function createLabel<T extends string | number>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
}
const firstLabel = createLabel("typescript"); // NameLabel
const secondLabel = createLabel(3.1415926); // IdLabel
const thirdLabel = createLabel(Math.random() ? "hello world" : 42); // NameLabel | IdLabel
const fourthLabel = createLabel(Math.random() ? 42 : "hello world"); // IdLabel | NameLabel
```

## 条件类型约束

通常，条件类型能给我们提供更具体的类型，条件类型的真分支能进一步地约束泛型类型。

```typescript
type MessageOf<T> = T["message"];
// Type '"message"' cannot be used to index type 'T'.
// 类型“"message"”无法用于索引类型“T”。
```

我们发现上面的 `MessageOf` 类型的例子中是有错误的。`T["message"]` 的语法大家都很熟悉，这是 js 中访问对象属性的方括号语法，在 ts 中类似，也可以用方括号语法访问对象类型中的属性从而得到对象类型中属性的类型。在这里，因为类型 `T` 并不知道它是否包含一个叫做 `message` 的成员，也就是说泛型 `T` 不一定是一个对象类型。所以在对一个不确定的类型上使用方括号语法时 ts 会抛出这样的错误：`Type '"message"' cannot be used to index type 'T'.`。所以，想要通过 `T["message"]` 能拿到泛型 `T` 中 `message` 成员的类型，我们必须将泛型 `T` 约束为一个对象类型，并且这个对象类型中还得有一个成员 `message`。 下面的代码对泛型 `T` 做了类型约束：

```typescript
type MessageOf<T extends { message: unknown }> = T["message"];
interface SuccessInfoType {
  message: string;
}
type SuccessInfoContents = MessageOf<SuccessInfoType>; // type SuccessInfoContents = string
```

上面这段代码，我们将泛型 `T` 约束为 `{ message: unknown }`，这样当我们通过 `T["message"]` 访问成员 `message` 时就能得到它的类型了。但是这里有一个问题，如果泛型 `T` 中不存在 `message` 成员的话会发生什么呢？

```typescript
type MessageOf<T extends { message: unknown }> = T["message"];
interface SuccessInfoType {
  errorMessage: string;
}
type SuccessInfoContents = MessageOf<SuccessInfoType>; // type SuccessInfoContents = unknown
// 类型“SuccessInfoType”不满足约束“{ errorMessage: unknown; }”。
//   类型 "SuccessInfoType" 中缺少属性 "errorMessage"，但类型 "{ errorMessage: unknown; }" 中需要该属性。
```



## 在条件类型中推断

## 分配条件类型
