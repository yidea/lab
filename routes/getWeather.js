var _ = require("underscore"),
  util = require("util"),
  NodeWeiboTwitter= require("node-weibo-twitter"),
  YQL = require("yql-weather-location"),
  twitterKeys = require("../configs/twitterKeys");

/*
 * @ getWeather
 * ----------------------------------
 * - TODO: add C/U support, use forecast.io instead? (more clear forecast of the day)
 */
exports.init = function (request, response) {
  YQL.weather({woeid: "2455920", unit: "c"})
    .then(function (res) {
      var twitter, today, msg;
      res = res.query.results.channel.item.forecast;

      if (!_.isEmpty(res)) {
        today = _.first(res);
        msg = util.format("%s-%s°C | %s | Mountain View | %s %s", today.low, today.high, today.text, today.day, today.date);

        // Post to twitter
        twitter = NodeWeiboTwitter.create("twitter", twitterKeys);
//        twitter.postTweet(msg + " @yidea", function (error, data) {
//          if (error) {
//            console.log(error);
//          }
//        });
      }
      response.json(res);

    }, function (err) {
      console.log(err);
    });
};
