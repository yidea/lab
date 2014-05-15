/*
* Config
*/
(function () {

  require.config({
    baseUrl: "scripts",
    shim: {
      jquery: {
        exports: "$"
      },
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore','jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
      },
      bootstrap: {
        deps: ['jquery'],
        exports: '$'
      },
      'jquery.typeahead': {
        deps: ['jquery'],
        exports: '$'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/dist/jquery.min',
      underscore: '../bower_components/underscore/underscore',
      backbone: '../bower_components/backbone/backbone',
      handlebars: '../bower_components/handlebars/handlebars',
      modernizr: '../bower_components/modernizr/modernizr',
      'requirejs-text': '../bower_components/requirejs-text/text',
      requirejs: '../bower_components/requirejs/require',
      'sass-bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
      'handlebars.runtime': '../bower_components/handlebars/handlebars.runtime',
      'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
      bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
      'jquery.typeahead': '../bower_components/typeahead.js/dist/typeahead.bundle',
      jsonselect: '../bower_components/jsonselect/src/jsonselect'
    }
  });

}).call(this);
