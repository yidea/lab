define(["underscore"], function (_) {
  /*
   * @ Underscore.powerpack
   * ----------------------------------
   * - https://github.com/yidea/underscore.powerpack
   * - TODO: extendClass, deepClone, deepExtend, trim, string natural sort
   */
  _.mixin({
    /***************** String helper *********************/
    //TODO: padding 0
    /**
     * _.format (str)
     * @description similar to printf or nodejs util.format("%s - %s", str1, str2)
     * @param {string} str
     * @returns {string}
     * @example .format("<h1> %s, %s</h1>", "name", "test");
     */
    format: function (str) {
      var result = "",
        args = arguments,
        i = 0;
      if (str == null) return result;
      result = str.replace(/%s/gi, function (match) {
        if (args[++i] == null) return "";
        return args[i];
      });
      return result;
    },

    reverse: function (str) {
      // string don't have reverse but can borrow from array.reverse
      // iovda
      // i: string "walmart"
      // o: string
      // v str set, is string/array
      // d: []
      // a: arr.reverse
      if (str == null) throw "{str} not set";
      if (!(_.isString(str) || _.isArray(str))) throw "{str} is not string/array";
      return str.split("").reverse().join("");
    },

    /**
     * _.trim (str)
     * @description trim string, polyfill for IE8-
     * @param {string} str
     * @returns {string} str being trimmed
     * @example
     */
    trim: function (str) {
      //TODO: native trim first then fallback
      if (str == null) throw new Error("{str} not set");
      return str.replace(/^\s+|\s+$/g, "");
    },

    ltrim: function (str) {
      if (str == null) throw new Error("{str} not set");
      return str.replace(/^\s+/, "");
    },

    rtrim: function (str) {
      if (str == null) throw new Error("{str} not set");
      return str.replace(/\s+$/, "");
    },

    removeWhitespace: function (str) {
      if (str == null) throw new Error("{str} not set");
      return str.replace(/\s/g, "");
    },

    /**
     * _.fixedCharCodeAt(str, idx)
     * @description Handle non-BMP(basic-multilingul-plan character) surrogate code point, inspired by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
     * @param {string} str
     * @param {number} idx
     * @returns {number|false}
     * @example
     * _.fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
     * _.fixedCharCodeAt ('\uD800\uDC00', 1); // false
     */
    fixedCharCodeAt: function (str, idx) {
      idx = idx || 0;
      var code = str.charCodeAt(idx);
      var hi, low;
      // High surrogate (could change last hex to 0xDB7F to treat high
      // private surrogates as single characters)
      if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
          throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have
        // already handled high surrogate above in the previous iteration
        return false;
      }
      return code;
    },

    /**
     * _.countBytesUTF8 (str)
     * @description get bytes size of string in utf-8 encoding (html/input value)
     * @param {}
     * @returns {}
     * @example
     */
    countBytesUTF8: function (str, countWhitespace) {
      if (str == null) throw "{str} not set";
      if (countWhitespace == null) countWhitespace = true;
      if (!countWhitespace) str = this.removeWhitespace(str);
      var result = 0,
        i, 
        len = str.length, 
        charCode;
      for (i=0; i<len; i++) {
        charCode = this.fixedCharCodeAt(str, i);
        if (typeof charCode === "number") {
          if (charCode < Math.pow(2, 7)) { //ASCII 128 1 byte/char
            result += 1;
          } else if (charCode < Math.pow(2, 11)) {
            result += 2;
          } else if (charCode < Math.pow(2, 16)) {
            result += 3;
          } else if (charCode < Math.pow(2, 21)) {
            result += 4;
          } else if (charCode < Math.pow(2, 26)) {
            result += 5;
          } else {
            result += 6;
          }
        }
      }
      return result;
    },


    /***************** Number helper *********************/
    /**
     * _.convertNumBase ()
     * @description covert number from one base to another
     * @param {num}
     * @example
     * _.convertNumBase(0xDB7F)(16)(10); //352657
     *  inspired and credit to https://gist.github.com/faisalman/4213592
     */
    convertNumBase: function (num) {
      return function from(fromBase) {
        return function to(toBase) {
          return parseInt(num, fromBase).toString(toBase);
        };
      };
    },

    hex2decimal: function (hex) { //16->10
      if (hex == null) throw new Error("{hex} is not set");
//      return parseInt(hex, 16);
      return +this.convertNumBase(hex)(16)(10);
    },

    decimal2hex: function (decimal) { //10->16
      if (decimal == null) throw new Error("{decimal} is not set");
//      return Number(decimal).toString(16).toUpperCase();
      return this.convertNumBase(decimal)(10)(16).toUpperCase();
    },

    binary2decimal: function (binary) { //2->10
      if (binary == null) throw new Error("{binary} is not set");
      return +this.convertNumBase(binary)(2)(10);
    },

    decimal2binary: function (decimal) {
      if (decimal == null) throw new Error("{decimal} is not set");
      return this.convertNumBase(decimal)(10)(2);
    },

    //rgb2hex, hex2rgb
    rgb2hex: function (r, g, b) {
      //i: 255,255,255
      //o: #ffffff or #fff
      //v: r,g,b all set
      //a: convert decimal2hex
      if (arguments.length !== 3) throw new Error("r,g,b is not all set");
      return "#" + this.decimal2hex(+r) + this.decimal2hex(+g) + this.decimal2hex(+b);
    },

    hex2rgb: function (hex) {
      //i: "#ffffff", shorthand "#fff"
      //o: [255,255,255]
      //v: hex is set
      //d: []
      //a: break into r,g,b then do hex2decimal
      if (hex == null) throw new Error("{hex} not set");
      //expand shorthand to full hex
      var regShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(regShorthand, function (match, r, g, b) {
        return r + r + g + g + b + b;
      });
      //convert
      var regGetRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      var result = regGetRGB.exec(hex);
      if (result == null) return null;
      return [this.hex2decimal(result[1]), this.hex2decimal(result[2]), this.hex2decimal(result[3])];
    }

  });

});
