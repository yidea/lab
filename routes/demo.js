/*
 * @ Demo
 * ----------------------------------
 */
exports.init = function (req, res) {
  res.render("demo", {
    layout: "layout-demo",
    title: "Demo"
  });
};
