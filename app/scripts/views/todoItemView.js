define(["jquery", "underscore", "backbone", "handlebars", "text!templates/todoItem.hbs", "hbs.helper"
], function ($, _, Backbone, Handlebars, tplTodo) {
  "use strict";

  var TodoItemView = Backbone.View.extend({
    tagName: "li",

    template: Handlebars.compile(tplTodo),

    // click toggle to toggle completed
    // click on input to enter "edit" mode
    // click outside input to enter "close" mode
    events: {
      "click .toggle": "_onClickToggleCompleted",
      "click .destroy": "_onClickDelete",
      "click .view label": "_onClickStartEdit",
      "blur .edit": "_onBlurEndEdit"
    },

    initialize: function () {
      // VM Listner
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);

    },
    
    render: function () {
      // add view
      this.$el.html(this.template(this.model.attributes));
      // add status
      this.$el.toggleClass("completed", this.model.get("completed"));

      return this;
    },

    // click toggle to toggle completed
    _onClickToggleCompleted: function () {
      this.model.toggle();
    },

    _onClickDelete: function () {
      this.model.destroy();
    },

    _onClickStartEdit: function (ev) { 
      this.$el.addClass("editing");
      this.$(".edit").trigger("focus");
    },

    // end Eidt mode and save changes to model if has valid input
    _onBlurEndEdit: function (ev) {
      var $target = $(ev.currentTarget),
        text = $.trim($target.val());

      if (!text) {
        this.model.destroy();
      } else {
        this.model.save({title: text});
      }

      this.$el.removeClass("editing");
    }
  });

  return TodoItemView;
});
