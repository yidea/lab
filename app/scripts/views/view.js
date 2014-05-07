/*global define*/

define(['jquery', 'underscore', 'backbone', "../models/model"
], function ($, _, Backbone, TodoModel) {

  var TodoView = Backbone.View.extend({
//    template: JST['app/scripts/templates/todo.hbs'],
    initialize: function () {
      // vda, mvc
      console.log("TodoView initialized");
      // init model
      var todoModel = new TodoModel();
    }
  });

  return TodoView;
});
