var _ = require("underscore"),
  async = require("async"),
  NodeWeiboTwitter= require("node-weibo-twitter"),
  twitterKeys = require("../configs/twitterKeys"),
  weiboBotKeys = require("../configs/weiboBotKeys");

/*
 * @ botCssTricks
 * ----------------------------------
 * - get CssTricks today's tweets, then bot to weibo if ?post=true, otherwise show tweets
 * - Refacto with botTweets
 */
exports.init = function (req, res) {
  var WEIBO_POST_INTERVAL = 2000; //weibo 20016: update too fast issue
  var twitter = NodeWeiboTwitter.create("twitter", twitterKeys),
    weibo = NodeWeiboTwitter.create("weibo", weiboBotKeys);
  


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

    // only post when passed ?post=true
    if (req.query.post) {
      // loop & post to weibo w async
      if (!_.isEmpty(result)) {
        async.eachSeries(result, function (item, callback) {
          url = _.first(item.entities.urls);
          msg = item.text.replace(url.url, url.expanded_url);

          weibo.postWeibo(msg, function () {
            setTimeout(function () {
              callback();
            }, WEIBO_POST_INTERVAL);
          });

        }, function (error) {
          if (error) {console.log(error); return;}
          res.json(result);
        });
      } else {
        res.json(result);
      }
    } else {
      res.json(result);
    }

  });
};
