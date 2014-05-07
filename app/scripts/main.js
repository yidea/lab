require(["config"], function () {

//  require(['backbone'], function (Backbone) {
//    Backbone.history.start();
//  });
  require(["jquery", "backbone", "views/view"], function ($, Backbone, TodoView) {
    $(function () {
      // Entry-point
      new TodoView();

    });
  });
});
