// Main controller
var _ = require("underscore");
//  mongoose = require("../mongoose"),
//  PresoSchema = mongoose.presoSchema;

exports.index = function (req, res) {
  res.render("home", {
    title: "test"
  });
};

exports.todo = function (req, res) {
  res.render("todo");
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
