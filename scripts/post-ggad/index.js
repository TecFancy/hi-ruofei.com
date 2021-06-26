/** 自动在 post 页面下方插入谷歌代码 */

"use strict";

/**
 * Render GGAD - 谷歌广告
 */
function renderPostGgad(text) {
  const ggadEle = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6487844781006261"
        data-ad-slot="3432081921"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  `;
  return text + ggadEle;
}

module.exports = renderPostGgad;
