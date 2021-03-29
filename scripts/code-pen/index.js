const element = ([username, slugHash, height]) => `
<p class="codepen" data-height="${height || 325}" data-theme-id="dark" data-default-tab="html,result" data-user="${username}" data-slug-hash="${slugHash}" style="height: ${height || 325}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Grid 中的行布局">
<span>See the Pen <a href="https://codepen.io/${username}/pen/${slugHash}">
Grid 中的行布局</a> by (<a href="https://codepen.io/${username}">@${username}</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
`;

/**
 * Tag: codepen
 * @param {String} username 必填，用户名
 * @param {String} slugHash 必填，codepen 的 slug-hash
 * @param {?String} height 选填，codepen 容器的高度，默认为 325px
 *
 * 用法：
 * {% codepen smpower KKNLJEW %}
 */
module.exports = function (args) {
  return element(args);
};
