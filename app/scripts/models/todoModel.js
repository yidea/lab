define(["underscore", "backbone"], function (_, Backbone) {
  "use strict";

  var TodoModel = Backbone.Model.extend({
    // set default attribute
    defaults:   {
      title: "",
      completed: false
    },

    toggle: function () {
      this.save({completed: !this.get("completed")});
    },

    clear: function () {
      this.destroy();
      // from 1-1 ref
      this.view.remove();
    }
  });

  return TodoModel;
});
