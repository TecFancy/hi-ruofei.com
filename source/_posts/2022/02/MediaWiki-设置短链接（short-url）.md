---
title: MediaWiki 设置短链接（short url）
abbrlink: 7ee6a6c0
date: 2022-02-22 19:15:36
updated:
categories: MediaWiki
tags:
keywords:
  - MediaWiki Short Url
  - MediaWiki 短链接
---

本方法适用于 Apache 服务器。一般情况下，该方法不需要修改 Apache 服务器的配置文件，只需要在 MediaWiki 安装目录下配置 .htaccess 文件即可。

<!-- more -->

## .htaccess 配置文件

在 MediaWiki 根目录下创建 .htaccess 配置文件，并写入一下内容：

```aconf
# Enable the rewrite engine
RewriteEngine On

# Short URL for wiki pages
RewriteRule ^/?w(/.*)?$ %{DOCUMENT_ROOT}/index.php [L]

# Redirect / to Main Page
RewriteRule ^/*$ %{DOCUMENT_ROOT}/index.php [L]
```

第二行代码表示开启 Apache 的重写引擎。

第四行代码中的 `%{DOCUMENT_ROOT}/index.php` 表示 MediaWiki 根目录下的 index.php 文件，也就是我们访问 MediaWiki 网站时的入口文件，这行代码的意思是当访问 MediaWiki 网站入口时，将其地址重写为 /w/。比如，当访问这个链接 https://domain.com/index.php?title=首页 时，这条规则会将地址重写为 https://domain.com/首页。这行代码是我们实现 MediaWiki 短链接的关键。

最后一行代码，也就是第六行代码表示当访问首页但地址栏没有任何参数时会将页面重定向到 MediaWiki 首页。比如访问 https://domain.com/ 时会重定向到 https://domain.com/index.php。被重定向的地址又会被应用到第四行代码的规则，将长链接重写为短链接，也就会被重定向到 https://domain.com/首页。

除了修改 .htaccess 配置文件，还需要修改 MediaWIki 的配置文件 LocalSettings.php。

## LocalSettings.php 配置文件

LocalSettings.php 文件位于 MediaWiki 安装目录的根目录下，在该文件最后的位置添加新增以下代码：

```php
$wgScriptPath = "";
$wgArticlePath = "/w/$1";
$wgUsePathInfo = true;
$wgScriptExtension = ".php";
```

关于这四行代码代表的意思可在 [MediaWiki 网站手册](https://www.mediawiki.org/wiki/Manual:Contents)中查看。

至此，即可实现通过短链接访问 MediaWiki。

## 参考

- [若非的维基](https://wiki.hi-ruofei.com)
- [MediaWiki 短链接](https://www.mediawiki.org/wiki/Manual:Short_URL/zh)
