---
title: 'JavaScript 根据 url 转换图像（base64）'
abbrlink: c6ada25a
date: 2022-03-24 16:52:47
updated:
categories:
  - 前端
tags:
  - JavaScript
  - JavaScript Canvas
keywords:
---

有时，我们需要根据图片的地址将图片转化为 base64 形式的字符串，然后将转换后的 base64 提交到后台。下面代码演示了如何根据图片的 url 来将其转换成 base64。

<!-- more -->

```js
function url2base64(url, callback) {
  const img = new Image();
  img.src = `${url}?v=${Math.random()}`;
  img.setAttribute('crossOrigin', 'Anonymous');
  img.onload = function() {
    const canvas = document.createElement('canvas');
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    const dataURL = canvas.toDataURL('image/jpeg');
    typeof callback === 'function' && callback(dataURL);
  };
}
```

使用方法：

```js
const url = 'https://www.baidu.com/img/bd_logo1.png';
url2base64(url, base64 => {
  console.log(base64);
  // expected output: 图像的 base64 编码
});
```

