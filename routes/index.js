var _ = require("underscore"),
  querystring = require('querystring'),
  request = require("request"),
  async = require("async"),
  $ = require("cheerio"),
  moment = require("moment-timezone"),
  twitterKeys = require("../twitterKeys"),
  weiboKeys = require("../weiboKeys"),
  Oauth= require('oauth'),
  oa;
//  mongoose = require("../mongoose"),
//  PresoSchema = mongoose.presoSchema;

exports.index = function (req, res) {
  res.render("home", { // view partial hbs
    title: "test"
  });
};

/*
 * @ getZhiBo
 * ----------------------------------
 */
exports.getZhiBo = function (req, res) {
  //TODO: current time count down
  var URL_ZHIBO = "http://www.zhiboxia.com/";
  // web scraping
  request(URL_ZHIBO, function (error, response, html) {
    if (!error) {
      // find recent 7 days game box
      // process each box: extract the content, merge the content if has data
      var $boxes = $(html).find(".box").slice(2, 9); // first 2 are featured
      var result = [];

      $boxes.each(function () {
        var items = _processBox(this);
        if (!_.isEmpty(items)) {
          result = result.concat(items);
        }
      });

      res.render("zhibo", {
        title: "zhibo",
        currentTime: moment().format("llll"),
        result: result
      });
    }
  });
};

function _processBox(box) {
  // process the content (matchDate, matchTime)
  var $box = $(box);
  var $lis = $box.find(".list li");
  var matchDate = $box.find(".box-title").text();
  var result = [];
  // filter match by team name and has live video
  $lis = $lis.filter(function () {
    var $matchName = $(this).find(".match-name"),
      matchName = $matchName.text();
    var teamInterested = ["阿森纳", "皇家马德里", "切尔西"];
    var strRe = "(^|\\s)" + teamInterested.join("|") + "($|\\s)",
      re = new RegExp(strRe);

    return matchName.search(re) !== -1 && matchName.search(/B队|青年/) === -1;
  });

  if ($lis.length) {
    $lis.each(function (index) {
      var $this = $(this);
      var obj = {};
      var $matchName = $this.find(".match-name"),
        matchTime = $this.find(".match-time").text();
      // convert CST to PDT
      var cstTime = new Date();
      var date = matchDate.match(/\d+/g);
      var time = matchTime.split(":");
      cstTime.setMonth(parseInt(date[0]) - 1);
      cstTime.setDate(parseInt(date[1]));
      cstTime.setHours(parseInt(time[0]));
      cstTime.setMinutes(parseInt(time[1]));
      var pdtTime = _getPDTfromChinaTime(cstTime);
      // schema
      obj.matchDate = matchDate;
      obj.matchCSTtime = matchTime;
      obj.matchPDTtime = pdtTime;
      obj.matchName = $matchName.text();
      obj.links = $matchName.nextAll();
      result[index] = obj;
    });
  }

  return result;
}

function _getPDTfromChinaTime(cstTime) {
  // convert China CST time(utc+8) to PDT time(utc-7)
  var matchTime = moment.tz(cstTime, "Asia/Shanghai");
  return matchTime.tz("America/Los_Angeles").format("llll");
}

/*
 * @ getWeather
 * ----------------------------------
 * - inspired by https://github.com/dannymidnight/node-weather/blob/master/yahoo.js
 * - get yahoo weather data via yahoo yql json wrapper or xml2js
 * https://developer.yahoo.com/weather
 */
exports.getWeather = function (req, res) {
  // vdaio
  // get y weather data now & mv
  // extract the key info (now - condition, forecast[1].code/high/low/text)
  // process weather info and alert to iphone(weibo/twitter)

  var API_YAHOO_WEATHER = "https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D%222455920%22%20and%20u%3D%22c%22&format=json";

  request(API_YAHOO_WEATHER, function (error, response, json) { 
    // vda
    var result = {};
    if (!error) {
      try {
        json = JSON.parse(json);
      } catch (e) {
        console.log(e);
        return;
      }

      var item = json.query.results.channel.item;
      // extract info
      result.title = item.title;
      result.now = item.condition;
      result.forcast = item.forecast;
      res.json(result);
    }
  });
};

exports.getCssTricks = function (req, res) {
  // cron job end of the day 23:50pm get the latest 5 tweets
  // map items by seeing if they are created today,
  // loop result array and weibo it

  _getTweet("Real_CSS_Tricks", 5, function (error, json) {
    if (error) {
      console.log(error);
      return;
    }

    try {
      json = JSON.parse(json);
    } catch (e) {
      console.log(e);
      return;
    }

    // TODO: pick only needed field
    // filter by only today's tweet
    var now = new Date().toDateString();
    var result =_.filter(json,function (tweet) {
      if (_.has(tweet, "created_at")) {
        var createTime = new Date(tweet.created_at);
        createTime = createTime.toDateString();
        return createTime === now;
      }
    });

    // loop & post to weibo w async
    if (!_.isEmpty(result)) {
      async.each(result, function (item, callback) {
        // iterator
        _postWeibo(item.text, callback);
      }, function (error) {
        // callback when all task done
        if (error) {
          console.log(error);
        } else {
          console.log(result.length + "message posted");
        }
      });
    }

    res.json(result);
  });

};

//TODO: factor out as weibo/twitter wrapper
function _initTwitterOauth() {
  //  http://blog.coolaj86.com/articles/how-to-tweet-from-nodejs.html
  //  https://dev.twitter.com/docs/api/1.1
  oa = new Oauth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    twitterKeys.consumer_key,
    twitterKeys.consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
}

function _getTweet(screenName, count, cb) {
  _initTwitterOauth();

  var api = "https://api.twitter.com/1.1/statuses/user_timeline.json?trim_user=true&exclude_replies=true&screen_name=";

  oa.get(
    api + screenName + "&count=" + count,
    twitterKeys.access_token_key,
    twitterKeys.access_token_secret,
    cb
  );
}

function _postTweet(cb) {
  _initTwitterOauth();

  oa.post(
    "https://api.twitter.com/1.1/statuses/update.json",
    twitterKeys.access_token_key,
    twitterKeys.access_token_secret,
    {"status": "Post 1st tweet via oauth @yidea"},
    cb
  );
}

function _initWeiboOauth() {
  oa = new Oauth.OAuth2(
    weiboKeys.consumer_key,
    weiboKeys.consumer_secret,
    "https://api.weibo.com/",
    "oauth2/authorize",
    "oauth2/access_token"
  );
}

function _weiboCallbackWrapper(cb) {
  return function (err, data, response) {
    if (err) {
      console.log(err);
      return;
    }
    var result;
    try {
      result = JSON.parse(data);
    } catch (e) {
      console.log(e);
      return;
    }
    cb(null, result, response);
  };
}

function _postWeibo(msg, cb) {
  // @Inspired by npm node-sina-weibo, weibo
  // repeated content will not be posted treat as error, add a timestamp

  /*
   * @ How to get Weibo access_token
   * ----------------------------------
   * - 0 Doc
   * http://open.weibo.com/wiki/%E6%8E%88%E6%9D%83%E6%9C%BA%E5%88%B6%E8%AF%B4%E6%98%8E
   * - 1 Get Authorize Code
   * https://api.weibo.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REGISTERED_REDIRECT_URI
   * - 2 Get Access Token (Use POSTMAN w post method, not support browser access)
   * https://api.weibo.com/oauth2/access_token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=authorization_code&redirect_uri=YOUR_REGISTERED_REDIRECT_URI&code=CODE
   */

  if (!cb) {
    cb = function () {};
  }
  _initWeiboOauth();

  var header = {"Content-Type": "application/x-www-form-urlencoded"},
    data = {status: msg};
  data.access_token = weiboKeys.access_token;

  data = querystring.stringify(data);
  oa._request("POST", "https://api.weibo.com/2/statuses/update.json", header, data, weiboKeys.access_token, _weiboCallbackWrapper(cb));
}


exports.getItem = function (req, res) {
  var number = req.param("number"); //string
  if (_.isEmpty(number)) {
    res.status(404).json({status: "error"});
  } else {
    res.end("item: " + number);
  }
};

exports.getJSON = function (req, res) {
  res.json({
    uid: "1",
    title: "test",
    name: "name"
  });
};

/*
 * @ Mongoose for MongoDB access
 * ----------------------------------
 */
//exports.writeToMongolab = function (req, res) {
//  var record = new PresoSchema({
//    uid: +new Date(),
//    name: "test",
//    number: 12
//  });
//  //save
//  record.save(function (err) {
//    if (err) {
//      failure(err);
//    } else {
//      res.json({status: "success"});
//    }
//  });
//};

//exports.readMongolab = function (req, res) {
//  // find model all data and set sort criteria, read + callback
//  PresoSchema
//    .find()
//    .setOptions({sort: "uid"})
//    .exec(function (err, data) {
//      if (err) {
//        failure(err);
//      } else {
//        res.render("home", {
//          title: "readMongolab",
//          data: data
//        });
//      }
//    });
//};

// helper
function failure(err) {
  res.status(500).json({status: "failure"}); //interal error 500
}
