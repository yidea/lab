define(["jquery", "underscore"], function ($, _) {

  var exports = {};

  /*
   * @ String util
   * ----------------------------------
   * -
   */
  exports.string = {
    /**
     * @method parseUrl(url)
     * @description parse Url with dom <a>
     * @param
     * @returns
     * @example
     var parser = u.string.parseUrl(""http://example.com:3000/pathname/?search=test#hash");
     parser.protocol; // => "http:"
     parser.hostname; // => "example.com"
     parser.port;     // => "3000"
     parser.pathname; // => "/pathname/"
     parser.search;   // => "?search=test"
     parser.hash;     // => "#hash"
     parser.host;     // => "example.com:3000"
     */
    parseUrl: function (url) {
      var urlParser = document.createElement("a");
      urlParser.href = url;
      return urlParser;
    },


    /**
     * @method getQueryParamByName(name)
     * @description get param value from name based on given url (by default window.location)
     * http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     * @param
     * @returns
     * @example
     u.string.getQueryParamByName("query", "/search/?query=ipad%203"); //ipad 3
     */
    getQueryParamByName: function (name, url) {
      var parser;
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      if (_.isUndefined(url)) {
        url = this._getWindow().location.search;
      } else {
        parser = this.parseUrl(url);
        url = parser.search;
        parser = null;
      }
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    // helper
    _getWindow: function () {
      return window;
    }
  };


  /*
   * @ dom util
   * ----------------------------------
   * -
   */
  exports.dom = {
    isInViewPort: function (el) {

    }

  };


  return exports;
});
