require(["config"], function () {
  // Entry-point

//  require(['backbone'], function (Backbone) {
  // router #search
  // pushState
  //  new Router();
  // Backbone.history.start(); //start listen to window history change
//  });

  require(["jquery", "backbone", "src/util", "views/todoAppView", "collections/todoCollection"], function ($, Backbone, util, TodoAppView, todos) {

    $(function () {
//      new ViewTodo({model: new ModelTodo()});
      new TodoAppView();
    });
  });
});
