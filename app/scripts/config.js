/*
* Config
*/
(function () {

  require.config({
    shim: {
      jquery: {
        exports: "$"
      },
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: [
          'underscore',
          'jquery'
        ],
        exports: 'Backbone'
      },
      bootstrap: {
        deps: [
          'jquery'
        ],
        exports: 'jquery'
      },
      handlebars: {
        exports: 'Handlebars'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/jquery',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore',
      bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
      handlebars: '../bower_components/handlebars/handlebars',
      modernizr: '../bower_components/modernizr/modernizr',
      'requirejs-text': '../bower_components/requirejs-text/text',
      requirejs: '../bower_components/requirejs/require',
      'sass-bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
      'handlebars.runtime': '../bower_components/handlebars/handlebars.runtime',
      'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage'
    }
  });

}).call(this);
