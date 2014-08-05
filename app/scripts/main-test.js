(function () {
  var root = this;

  // Declare test.
  root.APP_ENV = "test";

  // Chai: Global "expect".
  root.expect = chai.expect;

  // Mocha: Configuration
  mocha.setup({ui: "bdd"});

  require(["config"], function () {
    require([
      "jquery",
      "scripts/test-include-files"
    ], function ($) {
//      mocha.reorgSuites();
//      mocha.globalSetup();

      // Run mocha
      $(function () {
        mocha.run();
      });
    });
  });

}).call(this);
