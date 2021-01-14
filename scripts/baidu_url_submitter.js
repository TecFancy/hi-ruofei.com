hexo.extend.generator.register(
  "baidu_url_generator",
  require("./baiduUrlSubmitter/generator")
);

hexo.extend.deployer.register(
  "baidu_url_submitter",
  require("./baiduUrlSubmitter/submitter")
);
