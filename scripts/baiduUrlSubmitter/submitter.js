const pathFn = require("path");
const fs = require("fs");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (_args) {
  const log = this.log;
  const config = this.config;

  const host = config.baidu_url_submit.host;
  const token = config.baidu_url_submit.token;

  const publicDir = this.public_dir;
  const baiduUrlsFile = pathFn.join(publicDir, "baidu_urls.txt");
  const urls = fs.readFileSync(baiduUrlsFile, "utf8");

  log.info("Submitting urls \n" + urls);

  const target =
    "http://data.zz.baidu.com/urls?site=" + host + "&token=" + token;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", target, false);
  xhr.setRequestHeader("Content-type", "text/plain");
  xhr.onload = function () {
    console.log(this.responseText);
  };
  xhr.send(urls);
};
