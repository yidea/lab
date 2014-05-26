require(["config"], function () {

//  require(['backbone'], function (Backbone) {
  // router #search
  // pushState
  //  new Router();
  // Backbone.history.start(); //start listen to window history change
//  });

  require(["jquery", "backbone", "src/util", "views/view", "models/model"], function ($, Backbone, util, ViewTodo, ModelTodo) {
    $(function () {
      // Entry-point
      new ViewTodo({model: new ModelTodo()});
    });
  });
});

