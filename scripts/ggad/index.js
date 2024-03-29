/**
 * Tag: ggad-fluid - 手动在 md 文件中引入标签
 *
 * 用法：
 * {% ggad-fluid %}
 */

const element = () => `
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

module.exports = function () {
  return element();
};
