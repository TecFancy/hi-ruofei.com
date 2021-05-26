---
title: Cloudflare 转发 GitHub Gist
abbrlink: 3b43b1e4
date: 2021-05-23 01:05:51
updated:
categories:
  - MediaWiki
tags:
  - Extensions
  - 扩展
keywords:
  - Cloudflare
  - Github Gist
  - MediaWiki 插入 Github Gist
---

本文记录了如何在 MediaWiki 中插入 GitHub Gist 代码片段。

<!-- more -->

## 编写 MediaWiki 扩展 gists.php

首先编写一个 MediaWiki 扩展，文件命名为 `gists.php`：

```php
<?php

/**
 * Extension for MediaWiki to include GitHub Gists in pages.
 * Copyright (C) 2021 若非 <rf.wangchn@foxmail.com>
 *
 * @file
 * @ingroup Extensions
 * @author 若非 <rf.wangchn@foxmail.com>
 */

$wgExtensionCredits['gists'][] = array(
  'path' => __FILE__,
  'name' => 'Gists',
  'author' => '若非',
  'url' => '',
  'description' => '在你的 MediaWiki 中插入 GitHub Gist 代码片段。',
  'version' => 1.0
);

$wgHooks['ParserFirstCallInit'][] = 'mvGists';

/**
 * Add the <gist> tag to the parser.
 *
 * @param Parser $parser Parser object
 * @return bool true
 */
function mvGists( Parser $parser ) {
  $parser->setHook( 'gist', 'mvGistRender' );
  return true;
}

/**
 * Parses $input (gist number) and embeds gist code.
 *
 * @param string $input Contents of tag
 * @param array $args Attributes to the tag
 * @param Parser $parser Parser object
 * @param PPFrame $frame Current parser grame
 */
function mvGistRender( $input, array $args, Parser $parser, PPFrame $frame ) {
  if( !empty( $args['files'] ) ) {
    $files = explode( ' ', $args['files'] );
  } elseif( !empty( $args['file'] ) ) {
    $files = array( $args['file'] );
  } else {
    $files = array( '' );
  }

  if( !ctype_xdigit( $input ) ) {
    return '!!! Invalid gist number';
  } else {
    $gistId = trim( $input );
    $output = '';
    foreach( $files as $file ) {
      // 代理了 GitHub Gist
      // see: https://dash.cloudflare.com/a85714920ae16e02e952fe71641d9a70/workers/view/gist
      $output .= Html::linkedScript( "https://gist.icoder.workers.dev/{$input}.js?file={$file}" );
    }
    return $output;
  }
}
```

创建完成后，将该扩展文件放到 MediaWiki 站点根目录的 `extensions/gists/` 目录下。

在中国大陆无法访问 [https://gist.github.com/（点我试一下你能访问吗？）](https://gist.github.com/)，借助 [Cloudflare](https://dash.cloudflare.com/) 可以将其转发到其他域名下，这样就可以访问 <https://gist.github.com/> 了。

## 创建 Worker

在 Cloudflare 中创建一个 worker，内容如下：

```javascript
addEventListener("fetch", (event) => {
  const url = event.request.url.split("https://gist.icoder.workers.dev/")[1];
  return event.respondWith(fetch(`https://gist.github.com/${url}`));
});
```

代码中第 2 行是 Cloudflare 提供的 worker.dev 路由，部署后通过该地址即可访问 Github Gist 中的代码片段。不要开启你本地的 vpn，访问一下这个地址试一下：<https://gist.icoder.workers.dev/smpower/4814c681a44629f43b2f8455c436f669>。通过这个地址打开的页面就包含了上面的两个代码片段。

## 启用 gists 扩展

在 MediaWiki 的配置文件 `LocalSettings.php` 中启用该扩展：

```php
// 省略了其他配置项...
require_once "$IP/extensions/gists/gists.php";
```
