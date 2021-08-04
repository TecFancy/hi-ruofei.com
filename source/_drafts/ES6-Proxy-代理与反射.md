---
title: 'ES6 Proxy: 代理与反射'
abbrlink: d3910579
date: 2021-07-17 13:38:16
updated:
categories:
  - 前端
tags:
  - JavaScript:
keywords:
  - JavaScript
  - ES6
  - JavaScript - Proxy
  - ES6 - Proxy
  - JavaScript 代理与反射
  - ES6 代理代理与反射
---

## 创建空代理

最简单的代理是创建一个空代理，也就是只抽象一个目标对象，除此之外什么都不做。代理是使用 `Proxy` 构造函数创建的，该构造函数接收两个参数：目标对象和处理程序对象。要创建空代理，可以传一个简单的对象字面量作为处理程序对象，从而让所有操作畅通无阻地抵达目标对象。

下面一个简单的例子，在代理对象上的任何操作实际上都会应用到目标对象。唯一可感知的不同就是代码操作的是代理对象：

<!-- more -->

```javascript
const target = {
	id: 100,
};

const handler = {};

const proxy = new Proxy(target, handler);

// 访问 `target` 和 `proxy` 的 `id` 属性会得到相同的值
console.log(target.id); // 100
console.log(proxy.id); // 100
```

给目标对象中的属性赋值会反映在目标对象和代理对象上，因为这两个对象访问的是同一个值：

```javascript
target.id = 101;

console.log(target.id); // 101
console.log(proxy.id); // 101
```

给代理对象中的属性赋值会反映在代理对象和目标对象上，因为这个赋值会转移到目标对象上：

```javascript
proxy.id = 102;

console.log(target.id); // 102
console.log(proxy.id); // 102
```

代理对象和目标对象都有 `hasOwnProperty()` 方法：

```javascript
console.log(target.hasOwnProperty("id")); // true
console.log(proxy.hasOwnProperty("id")); // true
```

因为 `Proxy.prototype` 是 `undefined`，因此不能使用 `instanceof` 操作符：

```javascript
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
console.log(proxy instanceof Proxy);  // TypeError: Function has non-object prototype 'undefined' in instanceof check
```

使用严格相等可以用来区分目标对象和代理对象：

```javascript
console.log(target === proxy); // false
```

