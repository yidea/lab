var _ = require("underscore"),
  util = require("util"),
  NodeWeiboTwitter= require("node-weibo-twitter"),
  YQL = require("yql-weather-location"),
  twitterKeys = require("../configs/twitterKeys");

/*
 * @ botWeather
 * ----------------------------------
 * - get Weather info via Yahoo API, then bot to twitter
 * - TODO: add C/U support, use forecast.io instead? (more clear forecast of the day)
 */
exports.init = function (req, res) {
  YQL.weather({woeid: "2455920", unit: "c"})
    .then(function (response) {
      var twitter, today, msg;
      response = response.query.results.channel.item.forecast;

      // only post when passed ?post=true
      if (req.query.post) {
        if (!_.isEmpty(response)) {
          today = _.first(response);
          msg = util.format("%s-%s°C | %s | Mountain View | %s %s", today.low, today.high, today.text, today.day, today.date);

          // Post to twitter
          twitter = NodeWeiboTwitter.create("twitter", twitterKeys);
          twitter.postTweet(msg + " @yidea", function (error, data) {
            if (error) {
              console.log(error);
            }
          });
        }
      }

      res.json(response);

    }, function (err) {
      console.log(err);
    });
};
