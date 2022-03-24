---
title: JavaScript 中的 this
categories:
  - 前端
tags:
  - JavaScript
  - JavaScript 表达式和运算符之 this
keywords: 'JavaScript, this'
abbrlink: 28752f8
date: 2022-03-24 17:28:17
updated:
---

`this` 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也有可能不同。在绝大多数情况下，函数的调用方式决定了 `this` 的值。

在非严格模式下，`this` 值总是指向一个对象；在严格模式下，`this` 可以是任意值。

ES5 引入了 bind 方法来设置 `this` 值，而不用考虑函数是如何被调用的。

ES2015 引入了 箭头函数，而箭头函数则不提供自身的 this 绑定。

```js
// Expressions - this

const person = {
  name: 'Randal',
  getName: function() {
    return this.name;
  },
};

console.log(person.getName());
// expected output: Randal
```

<!-- more -->

## 全局上下文中的 `this`

无论是否在严格模式下，全局环境中的 `this` 都指向全局对象。

```js
// 浏览器中的 this 值是 window 对象
console.log(this === window); // true

name = 'Randal';
console.log(window.name); // Randal

this.age = 18;
console.log(window.age); // 18
console.log(age); // 18
```

还可以使用 globalThis 获取全局对象。无论我们的代码是否在当前上下文执行，我们都可以用 globalThis 获取全局对象。

## 函数上下文中的 `this`

函数内部的 `this` 值取决于函数被调用的方式。

### 非严格模式下，函数调用的 `this` 值

非严格模式下，若函数调用未设置 `this` 值，则 `this` 值默认指向全局对象。浏览器中的全局对象是 window 对象。

```js
function func() {
  return this;
}

// 在浏览器中
func() === window; // 在浏览器中，全剧对象是 window 

// 在 Node 中
func() === globalThis;
```

### 严格模式下，函数调用的 `this` 值

严格模式下，若进入函数内部的执行环境时没有设置 `this` 值，则 `this` 值为 `undefined`。

```js
function func() {
  'use strict';
  return this;
}

func() === undefined; // true
```

如果要把 `this` 值从一个环境传到另一个环境，就要用 [call](app://obsidian.md/JavaScript/标准内置对象/Function/call()) 或 [apply](app://obsidian.md/apply()) 方法。

### 示例

```js
const obj = { a: 'Custom' };

// 声明一个变量，并将该变量作为全局对象的属性
const a = 'Global';

function whatsThis() {
  return this.a; // this 的值取决于函数被调用的方式
}

whtasThis();  // 1
// expected output: "Global"

whtasThis.call(obj); // 2
// expected output: "Custom"

whtasThis.apply(obj); // 3
// expected output: "Custom"
```

1. 在非严格模式下，若函数调用未设置 `this` 值，则 `this` 值默认指向全局对象。在浏览器中，全局对象为 `Window`；在 Node 中，全局对象为 `globalThis`。在 `whatsThis` 函数体外定义了一个全局变量 `a`，所以函数 `whatsThis` 内部 `this.a` 的值就是全局变量 `a` 的值。因此，直接调用 `whatsThis()` 得到的返回值是 `Global`。
2. 通过调用 `whatsThis` 函数实例上的 [call()](app://obsidian.md/call()) 方法，使 `whatsThis` 的 `this` 指向 obj。此时，函数 `whatsThis` 内部的 `this.a` 指向的就是对象 `obj` 的属性 `a`，因此函数的返回值是 `Custom`。
3. 调用 `whatsThis` 函数实例上的 [apply()](app://obsidian.md/apply()) 方法，将对象 `obj` 指定为函数的 `this` 值。这样，在函数内部访问 `this` 上的成员 `a` 时，实际访问的就是对象 `obj` 中的 `a` 属性。因此，函数返回值为 `Custom`。

## 类上下文中的 `this`

`this` 在[类](app://obsidian.md/JavaScript 中的类)中的表现与在函数中类似，因为类的本质也是函数。

在类的构造函数中，`this` 是一个常规对象。类中所有非静态方法都会被添加到 `this` 的原型中。

```js
class Person {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPrototypeNames(proto));
  }
  getName() {}
  getAge() {}
  static getGender() {}
}

new Person(); // ['constructor', 'getName', 'getAge']
```

注意，静态方法不是 `this` 的属性，它们只是类自身的属性。

派生类的构造函数中没有初始的 `this` 绑定，可在基类的构造函数中调用 [super()](app://obsidian.md/super) 方法生成一个 `this` 绑定。调用 [super()](app://obsidian.md/super) 方法相当于执行以下代码：

```js
this = new Base(); // Base 为基类
```

注意，在调用 `super()` 之前引用 `this` 会抛出错误。

## 示例

### `this` 和对象转换

```js
function add(c, d) {
  return this.a + this.b + c +d;
}

const obj = { a: 1, b: 3 };

console.log(add.call(obj, 5, 7)); // 1
// expected output: 16

console.log(add.apply(obj, [10, 20])); // 2
// expected output: 34
```

1. `call()` 方法第一个参数用作 `this` 的对象，表示将函数 `add()` 方法的 `this` 绑定到对象 `obj` 上。这样，当在函数 `add()` 内部访问 `this` 时，它会指向到 `obj` 对象上。其余参数用作函数 `add()` 的参数。
2. `apply()` 方法的第一个参数用作 `this` 的对象，表示将函数 `add()` 的 `this` 绑定到对象 `obj` 上。这样，当在函数 `add()` 内部访问 `this` 时，它会指向到 `obj` 对象上。第二个参数是一个数组，数组中的成员用作 `add()` 方法的函数参数。

## 参考

- [MDN Web Docs: 类上下文中的 this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#类上下文)
