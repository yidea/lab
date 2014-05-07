require(["config"], function () {

//  require(['backbone'], function (Backbone) {
//    Backbone.history.start();
//  });
  require(["jquery", "jsonselect"], function ($) {
    $(function () {
      // Entry-point
      
      //test jsonselect
      //http://jsonselect.org/#overview
      var jsel = window.JSONSelect;
      var jsonObj = JSON.parse($("pre.doc").text());
      var result = jsel.match(".zones", jsonObj);
      console.log(result); //TODO:debug
    });

//    require(["src/clientjs"]);
  });
});
