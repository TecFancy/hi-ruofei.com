---
title: （JS）Chrome 下载 PDF 文件：（JS）解决 Chrome 浏览器下载 PDF 而不是预览 PDF
abbrlink: 29e80bac
date: 2021-06-20 01:35:17
updated:
categories:
  - 前端
  - QA
tags:
  - JavaScript
  - Chrome
---

在前端开发中遇到这样一个问题：在 Chrome 中通过一个链接下载 PDF 文件时却被 Chrome 浏览器打开预览了，这不是我想要的效果，点击 PDF 链接的时候我希望下载这个文件而不是去预览。这里提供一个解决方案，将 PDF 文件通过 `XMLHttpRequest` 请求的方式，将文件转换为文件流，然后实现下载 PDF 的功能。

<!-- more -->

具体 JS 代码如下：

```javascript
/**
 * @description 文件链接转文件流下载（主要针对 pdf - 解决谷歌浏览器 a 标签下直接打开 pdf 的问题）
 * @param {string} url 文件链接
 * @param {string} fileName 文件名
 * @param {string} type 文件类型
 */
export const fileLink2StreamDownload = ({ url, fileName, type }) => {
  const reg =
    /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
  if (!reg.test(url))
    throw new Error("传入参数不合法，`url` 不是标准的文件链接");

  const xhr = new XMLHttpRequest();
  // 规定请求的类型、URL 以及是否异步处理请求。
  //   三个参数分别是
  //     - method：请求的类型（GET 或 POST ）
  //     - url：文件在服务器上的位置
  //     - async：true（异步）或 false（同步）
  xhr.open("get", url, true);
  xhr.setRequestHeader("Content-Type", `application/${type}`);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = new Blob([this.response], { type: `application/${type}` });
      const objectUrl = URL.createObjectURL(blob);
      const ele = document.createElement("a");
      ele.href = objectUrl;
      ele.download = fileName;
      ele.click();
    }
  };
  xhr.send();
};
```

`fileLink2StreamDownload` 方法内部通过 `XMLHttpRequest` 发起一个 GET 请求，设置请求的响应类型为 `blob`，然后在页面上创建一个隐藏的 `a` 标签，然后点击一下这个 `a` 标签，实现 PDF 的下载功能。这里的关键是将文件链接转换为 `blob` 文件流来实现下载 PDF。如果 PDF 的链接有权限验证的话，可以用你项目中封装好的 `request` 方法代替上面的 `XMLHttpRequest` 方法。

上面的方法是经过项目验证过的，你可以放心大胆的 copy 过去，根据你的项目略作修改就能用了！甚至都不用改就可以。

