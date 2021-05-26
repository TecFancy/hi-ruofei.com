---
title: "如何用好 useState"
abbrlink: b9f201f0
date: 2021-05-22 10:22:38
updated:
categories: React
tags:
  - React Hooks
  - React 钩子函数
keywords: React,React Hook, React 内置 Hook,useState,useState 用法,useState 源码
---

React Hook 是 16.8 版本的新特性。React Hook 可以在我们不编写 class 的情况下使用 state 以及其他的 React 特性。

先来看下 `useState` 的函数签名：

```typescript useState 函数签名
// Unlike the class component setState, the updates are not allowed to be partial
type SetStateAction<S> = S | ((prevState: S) => S);
// this technically does accept a second argument, but it's already under a deprecation warning
// and it's not even released so probably better to not define it.
type Dispatch<A> = (value: A) => void;

/**
 * Returns a stateful value, and a function to update it.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

`useState` 是一个函数，它接收一个且是唯一一个参数，参数类型为 `S`。这个参数就是初始 state，初始 state 参数只有第一次渲染时会被用到。该参数可以是一个任意类型的初始值，也可以是一个函数。当传入函数时，这个函数必须要有返回值。

`useState` 的返回值是一个数组，这个数组包含两个元素：第一个元素是当前值，第二个元素是更新当前值的函数，你可以在一些事件处理函数中或其他地方调用这个函数。这个函数类似于 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

<!-- more -->

## `useState` 的参数

下面这个例子用来显示一个计数器。当按钮被点击时，计数器的值会增加。

```jsx 计数器1
import { useState } from "react";

const Count = () => {
  // 声明一个叫 `count` 的 state 变量和用来更新 `count` 变量的函数 `setCount`
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  );
};

export default Count;
```

上面计数器1的例子中，`count` 的初始值为 0，点击 `button` 按钮会触发更新 `count` 变量的方法 `setCount`，该方法会在 `count` 值的基础上加 1。

还可以通过向 `useState` 传入一个函数给 `count` 变量设置初始值：

``` jsx 计数器2
import { useState } from "react";

const Count = () => {
  const initCount = () => {
    let result = 0;

    // 经过一系列计算后得出 `count` 的初始值...
    // result = ...

    return result;
  };
  
  // 声明一个叫 `count` 的 state 变量和用来更新 `count` 变量的函数 `setCount`
  const [count, setCount] = useState(initCount);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  );
};

export default Count;
```

当给 `useState` 传入一个函数作为参数时，传入的函数必须要有返回值。上面计数器2的例子中，给 `useState` 传入了一个名为 `initCount` 的函数，该函数经过一系列复杂计算后得出初始的 `count` 值，再将其返回出去，也就是将 `initCount` 函数的返回值作为 `useState` 的初始值。

## `useState` 的返回值

数组中第二个元素是一个函数（`Dispatch` 函数），这个函数的作用是用来更新初始值的。该函数接收一个参数：

- 传入一个任意值，传入的值就是更新后的值；
- 传入一个函数作为 `Dispatch` 函数的参数，该函数参数接受一个 `prevState` 值，表示 `useState` 更新前的旧值，可通过函数内部的逻辑计算出要更新的值，再返回出去。

## `useState` 参数示例

## `useState` 返回值示例

这个参数可以是一个任意初始值，比如布尔类型的 `true`：

```jsx
const [loading, setLoading] = useState(false);
```

也可以是一个函数：

```jsx
const getMsg = () => "Hello";
const [msg, setMsg] = useState(getMsg);
```

`useState` 的返回值是一个数组，这个数组包含两个元素。第一个数组元素是初始值，也就是调用 `useState` 时传入的值。比如上面传入的布尔类型的 `true`，那么返回的数组中第一个元素的值就是 `true`。数组中第二个元素是一个函数，这个函数的作用是用来更新初始值的：

```jsx
const [loading, setLoading] = useState(false);
setLoading(true); // loading => true
```

上面的代码中，调用 `setLoading` 方法把初始值 `false` 更新为 `true`。这是 `useState` 最基本、也是最常见的用法。
