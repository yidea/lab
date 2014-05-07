(function () {
  var root = this;

  // Chai: Global "expect".
  root.expect = chai.expect;

  // Mocha: Configuration
  mocha.setup({
    ui: "bdd"
  });

  require(["config"], function () {
    require([
      "jquery",
      "test-include-files"
    ], function ($) {
      // Run mocha
      $(function () {
        mocha.run();
      });
    });
  });

}).call(this);
