define(["underscore", "backbone"], function (_, Backbone) {
  "use strict";

  var TodoRouter = Backbone.Router.extend({
    routes: {
      //#/completed
      "*filter": "setFilter"
    },

    setFilter: function (param) {
//      console.log(param);
    }
  });

  return TodoRouter;
});
