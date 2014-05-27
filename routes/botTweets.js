var _ = require("underscore"),
  async = require("async"),
  NodeWeiboTwitter= require("node-weibo-twitter"),
  twitterKeys = require("../configs/twitterKeys"),
  weiboKeys = require("../configs/weiboKeys");

/*
 * @ botTweets
 * ----------------------------------
 * - get Yidea today's tweets, then bot to weibo if ?post=true, otherwise show tweets
 */
exports.init = function (req, res) {
  var WEIBO_POST_INTERVAL = 3000; //weibo 20016: update too fast issue
  var twitter = NodeWeiboTwitter.create("twitter", twitterKeys),
    weibo = NodeWeiboTwitter.create("weibo", weiboKeys);

  twitter.getTweet("Yidea", 5, function (error, json) {
    if (error) throw new Error(error);

    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error(e);
    }

    // filter by only today's tweets
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

    // only post when passed ?post=true
    if (req.query.post) {
      // loop & post to weibo w async
      if (!_.isEmpty(result)) {
        async.eachSeries(result, function (item, callback) {
          url = _.first(item.entities.urls);
          msg = item.text.replace(url.url, url.expanded_url);
          msg = msg.replace(" via @delicious", "");
          console.log(msg);
          weibo.postWeibo(msg, function () {
            setTimeout(function () {
              callback();
            }, WEIBO_POST_INTERVAL);
          });

        }, function (error) {
          if (error) {
            throw new Error(error);
          }
        });
      }
    }

    res.json(result);
  });
};
