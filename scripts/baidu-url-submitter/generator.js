module.exports = function (locals) {
  const log = this.log;
  const config = this.config;
  const count = config.baidu_url_submit.count;
  const urlsPath = config.baidu_url_submit.path;

  log.info("Generating Baidu urls for last " + count + " posts and pages");

  // get last posts
  const postUrls = []
    .concat(locals.posts.toArray())
    .map(function (post) {
      return {
        date: post.date,
        permalink: post.permalink,
      };
    })
    .sort(function (a, b) {
      return b.date - a.date;
    })
    .slice(0, count)
    .map(function (post) {
      return post.permalink;
    });
  // get last pages
  const pageUrls = []
    .concat(locals.pages.toArray())
    .map(function (post) {
      return {
        date: post.date,
        permalink: post.permalink,
      };
    })
    .sort(function (a, b) {
      return b.date - a.date;
    })
    .slice(0, count)
    .map(function (post) {
      return post.permalink;
    });

  const allUrls = postUrls.concat(pageUrls).join("\n");

  log.info("Posts urls generated in " + urlsPath + "\n" + allUrls);

  return {
    path: urlsPath,
    data: allUrls,
  };
};
