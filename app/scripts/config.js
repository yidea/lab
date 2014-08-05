/*
* Config
*/
(function () {
  require.config({
    baseUrl: "/",
    shim: {
      jquery: {
        exports: "$"
      },
      underscore: {
        exports: "_"
      },
      backbone: {
        deps: ["underscore","jquery"],
        exports: "Backbone"
      },
      bootstrap: {
        deps: ["jquery"],
        exports: "$"
      },
      handlebars: {
        exports: "Handlebars"
      },
      "jquery.typeahead": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery.pfold": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery.easing": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery.mixitup": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery.typed": {
        deps: ["jquery"],
        exports: "$"
      },
      "jquery.powerpack": {
        deps: ["jquery"],
        exports: "$"
      }
    },
    paths: {
      scripts: "/scripts",
      views: "/scripts/views",
      collections: "/scripts/collections",
      models: "/scripts/models",
      routers: "/scripts/routers",
      templates: "/scripts/templates",
      src: "/scripts/src",
      spec: "/scripts/spec",

      underscore: "/bower_components/underscore/underscore",
      backbone: "/bower_components/backbone/backbone",
      "backbone.localStorage": "/bower_components/backbone.localStorage/backbone.localStorage",
      bootstrap: "/bower_components/bootstrap/dist/js/bootstrap",
      handlebars: "/bower_components/handlebars/handlebars",
      "handlebars.runtime": "/bower_components/handlebars/handlebars.runtime",
      "hbs.helper": "scripts/helper/hbshelper",
      modernizr: "/bower_components/modernizr/modernizr",
      requirejs: "/bower_components/requirejs/require",
      text: "/bower_components/requirejs-text/text",
      jquery: "/bower_components/jquery/dist/jquery.min",
      "jquery.typeahead": "/bower_components/typeahead.js/dist/typeahead.bundle",
      "jquery.pfold": "/bower_components/PFold/js/jquery.pfold",
      "jquery.easing": "/bower_components/jquery.easing/js/jquery.easing",
      "jquery.mixitup": "/bower_components/bower-mixitup/src/jquery.mixitup",
      "jquery.typed": "/bower_components/typed.js/js/typed",
      "jquery.powerpack": "/jquery.powerpack/dist/jquery.powerpack.browser"
    }
  });
}).call(this);
