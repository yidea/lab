require(["config"], function () {

//  require(['backbone'], function (Backbone) {
//    Backbone.history.start();
//  });

  require(["jquery", "backbone", "src/util", "views/view"], function ($, Backbone, util, TodoView) {
    $(function () {
      // Entry-point
      new TodoView();

    });
  });
});

