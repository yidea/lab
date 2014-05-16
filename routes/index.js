var _ = require("underscore"),
  request = require("request"),
  $ = require("cheerio"),
  moment = require("moment-timezone");
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
 * -
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
  * http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D%221968212%22&format=json
 */
exports.getWeather = function (req, res) {
  // vdaio
  var API_YAHOO_WEATHER = "https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D%222455920%22&format=json";
  
  request(API_YAHOO_WEATHER, function (error, response, json) { 
    // vda
    console.log(json);
  });
};

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
