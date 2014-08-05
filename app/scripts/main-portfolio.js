require(["config"], function () {
  // Entry-point
  require([
    "jquery",
    "underscore",
    "backbone",
    "views/portfolioAppView"
  ], function ($, _, Backbone, PortfolioAppView) {
    "use strict";

    $(function () {
      //TODO: data-spy, console log eastern egg
      window.App = {};
      App.view = new PortfolioAppView();
    });
  });
});
