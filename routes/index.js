var _ = require("underscore");

exports.index = function (req, res) {
  res.render("portfolio", {
    layout: "layout-portfolio",
    title: "portfolio"
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

exports.todo = function (req, res) {
  res.render("todo");
};

exports.tool = function (req, res) {
  res.render("tool", {
    layout: "layout-doc",
    title: "Tool"
  });
};
