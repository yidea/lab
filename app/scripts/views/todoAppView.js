define(["jquery", "underscore", "backbone", "collections/todoCollection", "views/todoItemView"
], function ($, _, Backbone, Todos, TodoItemView) {
  "use strict";

  var TodoAppView = Backbone.View.extend({
    el: ".js-todo",

    collection: new Todos(),

    events: {
      "keypress #new-todo": "_onKeypressNewTodo"
    },

    initialize: function () {
      // VM Listner
      this.listenTo(this.collection, "reset", this._addAll);
    },

    render: function () {
      // rerender the app (common info-header, footer)

    },

    _onKeypressNewTodo: function (ev) {
      var text = $.trim($(this).val());
      if (!text || ev.which !== 13) {return;}

      Todos.create({
        title: text,
        completed: false

      });
    },

    _addAll: function () {
      this.$("#todo-list").html("");
      this.collection.each(function (todo) {
      });
    },

    _addOne: function (todo) {
      var todoView = new TodoItemView({model: todo});
      $("#todo-list").append(view.render().el);

    }

  });

  return TodoAppView;
});
