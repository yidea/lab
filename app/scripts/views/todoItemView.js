define(["jquery", "underscore", "backbone", "handlebars", "text!templates/todo.hbs"
], function ($, _, Backbone, Handlebars, tplTodo) {
  "use strict";

  var TodoItemView = Backbone.View.extend({
    tagName: "li",

    template: Handlebars.compile(tplTodo),

    events: {},

    initialize: function () {
      // VM Listner
//      this.listenTo(this.model, "reset", this._addAll);

    }

  });

  return TodoItemView;
});
