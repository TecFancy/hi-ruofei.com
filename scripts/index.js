hexo.extend.generator.register(
  "baidu_url_generator",
  require("./baidu-url-submitter/generator")
);

hexo.extend.deployer.register(
  "baidu_url_submitter",
  require("./baidu-url-submitter/submitter")
);

hexo.extend.tag.register("codepen", require("./code-pen"));

// Register foot-notes filter
hexo.extend.filter.register("before_post_render", function (data) {
  data.content = require("./foot-note")(data.content);
  return data;
});

hexo.extend.tag.register("ggad", require("./ggad"));

// Register ggad filter
hexo.extend.filter.register("before_post_render", function (data) {
  data.content = require("./post-ggad")(data.content);
  return data;
});
