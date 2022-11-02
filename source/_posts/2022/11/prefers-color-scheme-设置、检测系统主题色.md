---
title: prefers-color-scheme 设置、检测系统主题色
date: 2022-11-02 17:19:17
updated:
categories: CSS
tags:
keywords:
  - CSS
  - prefers-color-scheme
---

我们在访问某个站点时，有时可能会发现这样一种场景：该站点在白天访问时，它是亮色主题；当晚上访问时，它就变成暗色主题了。而且这种主题的切换是自动的，他会随系统主题变化而改变。如果我们要将这种功能应用在自己站点上，该如何实现呢？

本文涉及三个相关知识点：

1. 设置主题色
2. 检查主题色
3. 监听主题色变化

<!-- more -->

## 设置主题色

在 CSS 中，提供了一种设置系统主题色的媒体特性 `prefers-color-scheme`，该特性通常提供两个值 `light` 和 `dark`。顾名思义，这两个值一个代表 `日间模式`，一个表示 `夜间模式`。并且他们的兼容性也是最好的。

![prefers-color-scheme 兼容性][1]

这里有一个简单的例子，可以很方便的通过 CSS 实现系统主题色：

```css
.day {
  background: #eee;
  color: black;
}
.night {
  background: #333;
  color: white;
}

@media (prefers-color-scheme: dark) {
  .day.dark-scheme {
    background: #333;
    color: white;
  }
  .night.dark-scheme {
    background: black;
    color: #ddd;
  }
}

@media (prefers-color-scheme: light) {
  .day.light-scheme {
    background: white;
    color: #555;
  }
  .night.light-scheme {
    background: #eee;
    color: black;
  }
}
```

当系统主题为日间模式时，会应用上面的 light 主题样式；当系统主题为夜间模式时，会应用上面的 dark 主题样式。

实际开发中，我们会将项目用到的色值抽离出来作为全局的公共变量，方便我们对项目整体的色值管理。如：

```css
:root {
  // Light Theme
  --PrimaryBackgroundColorLight: #f9f9f9;
  --PageBackgroundColorLight: #efefef;
  --PrimaryColorLight: #34495e;
  --PrimaryActivedColorLight: #1890ff;

  // Dark Theme
  --PrimaryBackgroundColorDark: #293042;
  --PageBackgroundColorDark: #202634;
  --PrimaryColorDark: #c6cfd8;
  --PrimaryActivedColorDark: #1890ff;
}
```

我们定义好全局 CSS 变量后，在需要的地方直接引用即可：

```css
.day.light {
  background-color: var(--PrimaryBackgroundColorLight);
}
```

## 检测主题色

既然能通过 CSS 设置系统主题色，那 JS 肯定也有能力来检测系统主题色。JS 提供了一个用于检查媒体查询的函数 `matchMedia`，利用该函数能方便地检查当前系统主题色：

```js
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
if (themeMedia.matches) {
  // 日间模式
} else {
  // 夜间模式
}
```

## 监听主题色变化

除了获取当前系统主题色，我们还能监听主题色的变化。

```js
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener((e) => {
  if (e.matches) {
    console.log("light");
  } else {
    console.log("dark");
  }
});
```

通过上面提到的三个知识点，在自己站点实现主题色功能是绰绰有余的。像一些更丰富的多主题切换，虽然实现的方法不同，但思路基本都是类似的。总结起来就是开篇的三句话：如何设置主题、获取当前被应用的主题以及监听主题的变更。

以上，希望对你有所帮助。

[1]: https://www.hi-ruofei.com/usr/uploads/2022/09/4286262697.png
