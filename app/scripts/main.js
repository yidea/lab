require(["config"], function () {
  // Entry-point

//  require(['backbone'], function (Backbone) {
  // router #search
  // pushState
  //  new Router();
  // Backbone.history.start(); //start listen to window history change
//  });

  require(["jquery", "backbone", "views/todoAppView", "routers/todoRouter"], function ($, Backbone, TodoAppView, TodoRouter) {
    // Entry point
    $(function () {
      window.App = {};
      App.router = new TodoRouter();
      App.view = {};

      Backbone.history.start({
        pushState: true,
        root: "todo"
      });

      $(document).on("click", "a[href^='/']", function (ev) {
        ev.preventDefault();

        var href = $(ev.currentTarget).attr("href"),
          url = href.replace(/^\//, "");
//        App.router.navigate(url, {trigger: true});
        Backbone.history.navigate(url, true);
      });

      $(window).on("popstate", function(ev){
        console.log("popstate:" + ev.originalEvent.state);
      });

      App.view.todo = new TodoAppView();
    });
  });
});
