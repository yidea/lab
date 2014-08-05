define([
  "jquery",
  "underscore",
  "backbone",
  "bootstrap",
  "jquery.pfold",
  "jquery.easing",
  "jquery.mixitup",
  "jquery.typed"
], function ($, _, Backbone) {
  "use strict";
  /*
   * @ PortfolioAppView
   * ----------------------------------
   */
  var OFFSET_HEADER = 60;
  var PortfolioAppView = Backbone.View.extend({
    el: "body",

    events: {
      "click .header .nav a": "_onClickScroll",
      "click .uc-container .uc-initial-content": "_onClickUnfold",
      "click .uc-container .close": "_onClickFold"
    },

    initialize: function () {
      this._initTyping();

      this._initPfold();

      //todo: add image lazyload
      this.$(".portfolio-grid").mixItUp();
    },

    _initTyping: function () {
      var self = this;
      this.$("#typing").typed({
        strings: ["a front end developer", "an ex-UX designer", "Yi Cao"],
        typeSpeed: 30,
        callback: function (ev) { 
          self.$("#typing-after").addClass("in");
          self.$("#home").addClass("typed");
          _.delay(function () {
            self._initScrollSpy();
          }, 2000);
        }
      });
    },

    _initScrollSpy: function () {
      this.$el.scrollspy({
        target: ".header",
        offset: OFFSET_HEADER
      });
    },

    _initPfold: function () {
      var $pfold,
        pfold,
        direction,
        vDirection = "bottom";
      this.$(".uc-container").each(function (index) {
        $pfold = $(this);
        if (index / 4 >= 1) vDirection = "top";
        switch (index % 4) {
          case 0:
            direction = ["right", vDirection, "right"];
            break;
          case 1:
            direction = ["left", vDirection, "right"];
            break;
          case 2:
            direction = ["right", vDirection, "left"];
            break;
          case 3:
            direction = ["left", vDirection, "left"];
            break;
        }
        pfold = $pfold.pfold({
          easing: "ease-in-out",
          speed: 400,
          folds: 3,
          folddirection: direction
        });
        $pfold.data("pfold", pfold);
      });
    },

    _onClickScroll: function (ev) {
      ev.preventDefault();

      var target = ev.currentTarget,
        offsetTop = $(target.hash).offset().top;
      if (target.hash !== "#home") offsetTop -= OFFSET_HEADER;
      this.$el.stop().animate({scrollTop: offsetTop}, 800, "easeInOutCubic");
    },

    _onClickUnfold: function (ev) {
      var $target = $(ev.currentTarget),
        $uc = $target.closest(".uc-container"),
        pfold = $uc.data("pfold");

      if ($uc.attr("data-opened")!== true) {
        pfold.unfold();
        $uc.attr("data-opened", true);
      }

      // listen to esc for close
      $(document).on("keyup", function (ev) {
        if (ev.which === 27) {
          if ($uc.attr("data-opened")) {
            pfold.fold();
            $uc.attr("data-opened", false);
          }
          $(document).off("keyup");
        }
      });
    },

    _onClickFold: function (ev) {
      var $target = $(ev.currentTarget),
        $uc = $target.closest(".uc-container"),
        pfold = $uc.data("pfold");

      if ($uc.attr("data-opened")) {
        pfold.fold();
        $uc.attr("data-opened", false);
        $(document).off("keyup");
      }
    }
  });

  return PortfolioAppView;
});
