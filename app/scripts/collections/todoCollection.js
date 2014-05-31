define(["underscore", "backbone", "backbone.localStorage", "models/todoModel"
], function (_, Backbone, LocalStorage, Todo) {
  "use strict";

  //TODO: save it via mongodb
  var TodoCollection = Backbone.Collection.extend({
    model: Todo,

    localStorage: new LocalStorage("todo"),

    // Filter finished todos
    completed: function () {
      return this.filter(function (todo) {
        return todo.get("completed");
      });
    },

    // Filter un-finished todos
    remaining: function () {
      return this.without.apply(this, this.completed());
    },

    // Next order# for new item
    nextOrder: function () {
      if (!this.length) { return 1; }
      return this.last().get("order") + 1;
    },

    comparator: function (todo) {
      return todo.get("order");
    }
  });

  return TodoCollection;
});
