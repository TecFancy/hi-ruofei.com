hexo.extend.generator.register(
  "baidu_url_generator",
  require("./baidu-url-submitter/generator")
);

hexo.extend.deployer.register(
  "baidu_url_submitter",
  require("./baidu-url-submitter/submitter")
);

hexo.extend.tag.register("codepen", require("./code-pen"));

hexo.extend.tag.register("ggad", require("./ggad"));
