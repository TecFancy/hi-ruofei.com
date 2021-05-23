---
title: "如何用好 useState"
abbrlink: b9f201f0
date: 2021-05-22 10:22:38
updated:
categories: React
tags:
  - React Hooks
  - React 钩子函数
---

React Hook 是 16.8.0 版本之后的新特性。

先来看下 `useState` 的函数签名：

```typescript
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
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

<!-- more -->

`useState` 是一个函数，它接受 1 个参数，参数类型为 `S`。这个参数可以是一个任意类型的初始值，也可以是一个函数。当传入函数时，这个函数必须要有返回值。

`useState` 的返回值是一个数组，这个数组包含两个元素。

第一个数组元素是初始值，也就是调用 `useState` 时传入的值，它的类型与传入的初始值类型相同。

数组中第二个元素是一个函数（`Dispatch` 函数），这个函数的作用是用来更新初始值的。这个函数接受一个参数：

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
const getMsg = () => 'Hello';
const [msg, setMsg] = useState(getMsg);
```

`useState` 的返回值是一个数组，这个数组包含两个元素。第一个数组元素是初始值，也就是调用 `useState` 时传入的值。比如上面传入的布尔类型的 `true`，那么返回的数组中第一个元素的值就是 `true`。数组中第二个元素是一个函数，这个函数的作用是用来更新初始值的：

```jsx
const [loading, setLoading] = useState(false);
setLoading(true); // loading => true
```

上面的代码中，调用 `setLoading` 方法把初始值 `false` 更新为 `true`。这是 `useState` 最基本、也是最常见的用法。
