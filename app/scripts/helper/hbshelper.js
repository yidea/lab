define(["handlebars"
], function (Handlebars) {
  "use strict";

  /*
   * @ Handlebar Helper
   * ----------------------------------
   * - Inspired by https://github.com/raDiesle/Handlebars.js-helpers-collection#IfEqual
   */


  //{{#ifequal completed 1}}item{{else}}items{{/ifequal}}
  Handlebars.registerHelper("ifequal", function (val1, val2, options) {
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

});
