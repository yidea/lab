var _ = require("underscore"),
  NodeWeiboTwitter= require("node-weibo-twitter"),
  twitterKeys = require("../configs/twitterKeys"),
  weiboKeys = require("../configs/weiboKeys");

/*
 * @ botCssTricks
 * ----------------------------------
 * - get CssTricks tweets, then bot to weibo
 */
exports.init = function (request, response) {
  var twitter = NodeWeiboTwitter.create("twitter", twitterKeys),
    weibo = NodeWeiboTwitter.create("weibo", weiboKeys);

  twitter.getTweet("Real_CSS_Tricks", 5, function (error, json) {
    if (error) throw new Error(error);

    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error(e);
    }

    // filter by only today's tweet
    // TODO: pick only needed field
    var now = new Date().toDateString(),
      msg,
      result,
      url;
    
    result =_.filter(json, function (tweet) {
      if (_.has(tweet, "created_at")) {
        var createTime = new Date(tweet.created_at);
        createTime = createTime.toDateString();
        return createTime === now;
      }
    });

    // loop & post to weibo w async
    if (!_.isEmpty(result)) {
      async.each(result, function (item, callback) {
        url = _.first(item.entities.urls);
        msg = item.text.replace(url.url, url.expanded_url);
        weibo.postWeibo(msg, callback);
      }, function (error) {
        if (error) {
          throw new Error(error);
        } else {
          console.log(result.length + " articles posted");
        }
      });
    }

    response.json(result);
  });
};
