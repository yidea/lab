define(["jquery", "underscore", "backbone", "collections/todoCollection", "views/todoItemView"
], function ($, _, Backbone, Todos, TodoItemView) {
  "use strict";

  /*
   * @ TODOMVC
   * ----------------------------------
   * based on https://github.com/tastejs/todomvc/tree/gh-pages/dependency-examples/backbone_require
   * TODO: add support for Undo changes,  mongodb
   */

  var TodoAppView = Backbone.View.extend({
    el: ".js-todo",

    collection: new Todos(),

    events: {
      "keypress #new-todo": "_onKeypressNewTodo"
    },

    initialize: function () {
      // Dom cache
      this.$input = this.$("#new-todo");

      // VM Listner
      this.listenTo(this.collection, "reset", this._addAll); //init load
      this.listenTo(this.collection, "add", this._addOne);
      this.listenTo(this.collection, "all", this.render);

      // M load
      this.collection.fetch({reset: true});
    },

    render: function () {
      // rerender the app (common info-header, footer)
    },

    _onKeypressNewTodo: function (ev) {
      var $target = $(ev.currentTarget),
        text = $.trim($target.val());

      if (ev.which !== 13 || !text) {return;}

      // TODO: don't allow duplicate title
      this.collection.create({
        title: text,
        completed: false,
        order: this.collection.nextOrder()
      });

      this.$input.val("");
    },

    _addAll: function () {
      this.$("#todo-list").html("");
      this.collection.each(this._addOne, this);
    },

    // add item view w M to dom
    _addOne: function (todo) {
      var todoView = new TodoItemView({model: todo});
      $("#todo-list").append(todoView.render().el);
    }
  });

  return TodoAppView;
});
