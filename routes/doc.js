var _ = require("underscore");
/*
 * @ Doc
 * ----------------------------------
 */
exports.index = function (req, res) {
  res.render("doc", {
    layout: "layout-doc",
    title: "Index"
  });
};

exports.javascript = function (req, res) {
  res.render("doc-js", {
    layout: "layout-doc",
    title: "JS"
  });
};

exports.css = function (req, res) {
  res.render("doc-css", {
    layout: "layout-doc",
    title: "CSS"
  });
};

exports.html = function (req, res) {
  res.render("doc-html", {
    layout: "layout-doc",
    title: "HTML"
  });
};

exports.ds = function (req, res) {
  res.render("doc-ds-alg", {
    layout: "layout-doc",
    title: "DS"
  });
};

exports.crossbrowser = function (req, res) {
  res.render("doc-crossbrowser", {
    layout: "layout-doc",
    title: "Crossbrowser"
  });
};

exports.mobile = function (req, res) {
  res.render("doc-mobile", {
    layout: "layout-doc",
    title: "Mobile"
  });
};

exports.performance = function (req, res) {
  res.render("doc-performance", {
    layout: "layout-doc",
    title: "Performance"
  });
};

exports.security = function (req, res) {
  res.render("doc-security", {
    layout: "layout-doc",
    title: "Security"
  });
};
