var _ = require("underscore"),
  superagent = require("superagent"),
  $ = require("cheerio"),
  moment = require("moment-timezone");

/*
 * @ getZhiBo
 * ----------------------------------
 * -TODO: current time count down
 */
exports.init = function (req, res) {
  var URL_ZHIBO = "http://www.zhiboxia.com/";
  // web scraping
  superagent
    .get(URL_ZHIBO)
    .end(function (err, response) {
      if (err) throw new Error(err);
      
      var html = response.text,
        $boxes = $(html).find(".box").slice(2, 9),
        result = [];

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
    var teamInterested = ["阿森纳", "皇家马德里", "切尔西", "德国"];
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
