/* underscore analysis
 *
 * http://kangax.github.io/es5-compat-table/
 *
 * TODO:
 * - typeof options.symbol !== "undefined" vs. hasOwnProperty()
 * - Regex helper
 * // Regexes containing the keys and values listed immediately above.
 * - Object.create
 * // underscore examples /playground
 * */
define([], function () {
  var u = window.Util = {};
  u.version = "0.1";

  // Basic setup & catch
  var root = this, //window
    ArrayPrototype = Array.prototype;

  // ECMSScript 5 native api
  var nativeForEach = ArrayPrototype.forEach,
    nativeIndexOf = ArrayPrototype.indexOf,
    nativeSome = ArrayPrototype.some;

  // Collection
  // -------------
  /*
   isNaN
   isFinite
   Object
   isWindow
   isjQueryObject
   new Object()
   emtpyObject()
   * */
  u.isArray = Array.isArray || function (obj) { // ECMA5 native Array.isArray IE 9+
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  // Array || Nodelist || jQueryObject like
  u.isArrayLike = function (obj) {
    if (u.isArray(obj) || u.isDomElement(obj) || (!u.isFunction(obj) && obj.length === +obj.length)) { //check length & type is number and >0, default function.length = 1, object doesn't have .length
      return true;
    }
    return false;
  };

  u.isObject = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  u.isDomElement = function (obj) { // Node
    return !!(obj && obj.nodeType === 1); //html dom element
    //or "[object HTMLCollection]"
  };

  u.isNodeList = function (obj) { // NodeList

  };

  u.isPlainObject = function (obj) {

  };

  u.isUndefined = function (obj) {
    //return typeof obj === "undefined";
    return obj === void 0; //avoid undefined being overrided, void 0 safely return undefined
  };

  u.isNull = function (obj) {
    return obj === null;
    //obj == null will check undefined/null
  };

  /**
   * .has(obj, prop)
   * - check if obj has a given direct property(not from prototype inherit)
   * @param obj
   * @param prop
   * @returns {boolean}
   */
  u.has = function (obj, prop) {
    if (obj == null) {return false;} //validate null/undefined
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };

  /*
  * .contains (obj, value)
  * - check if array/obj contains a given value ===
  */
  u.contains = function (obj, value) {
    if (obj == null) {return false;} //validate null/undefined
    // Array.indexOf if supported and has Array.indexOf method
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
      return obj.indexOf(value) !== -1;
    }
    // Object
    return u.some(obj, function (v) {
      return v === value;
    });
  };

  /**
   * .each (collection, callback, [context]) ||.forEach()
   * iterate/forEach collection and operate on each
   * @param collection {Object|Array}
   * @param callback {Funciton}
   * @param context
   * @return {Null}
   *  .each([1, 2, 3], funciton(value, index, list){});
   *  .each({one: 1, two: 2, three: 3}, function(value, key, list){});
   *  //TODO return false
   */
  var each = u.each = u.forEach = function (collection, callback, context) {
    if (collection == null) {return;} //validate: null/undefined
    var type = Object.prototype.toString.call(collection),
      i = 0,
      result;
    // Arraylike obj: array||nodelist(no forEach method)||jqObject
    if (u.isArrayLike(collection)) {
      // if support navtive Array forEach(IE9+) and has obj.forEach, then use native forEach, otherwize fallback w for loop
      // NodeList is inherited from host object not from array, so don't have forEach, map, filter API
      if (nativeForEach && collection.forEach === nativeForEach) { //Prefer use feature detection instead of type detection
        collection.forEach(callback, context);
      } else { // fallback w for loop
        var len = collection.length; // better performance
        for (; i < len; i++) {
          result = callback.call(context, collection[i], i, collection);
          if (result === false) {break;}
        }
      }
    // object
    } else if (u.isObject(collection)) {
      for (i in collection) {
        if (u.has(collection, i)) { //direct properties
          result = callback.call(context, collection[i], i, collection);
          if (result === false) {break;}
        }
      }
    }
  };

  // General type check: isNodeList, isHTMLCollection, isString, isNumber, isFunction, is ..
  each(["NodeList","HTMLCollection", "String", "Number", "Function", "Boolean", "Date", "RegExp", "Arguments"], function (value) {
    //typeof value === "string"
    u["is" + value] = function (obj) {
      return Object.prototype.toString.call(obj) === "[object " + value + "]";
    };
  });

  /**
   * .some (obj, callback, context) / .any
   * - test whether some elements in array/obj passes test function
   * - u.some({a: 1}, function(value, key, obj){return value === 1})
   * @param obj
   * @param callback
   * @param [context]
   * @returns {boolean}
   */
  u.some = u.any = function (obj, callback, context) {
    if (obj == null) {return false;} //validate null/undefined
    // if array and native support
    if (nativeSome && obj.some === nativeSome) {
      return obj.some(callback, context);
    }
    // if object
    var result = false;
    each(obj, function (value, key, list) {
      result = callback.call(context, value, key, list);
      if (result) {return false;}
    });
    return !!result;
  };

  // Array-like
  // -------------
  // union: concat/merge 2 array and return uniqued array
  //http://documentcloud.github.io/underscore/#union
  u.union = function () {
    // use apply(thisArg, [argsArray]) when don't know specific arguments
    return ArrayPrototype.concat.apply(ArrayPrototype, arguments);
  };

  // unique: array remove duplicate
  // u.unique([1,1,2]) //=1,2
  u.unique = function () {

  };

  // Object
  // -------------
  // covert NodeList(arraylike) to Array, so an use Array ES5 API forEach, map, filter
  // IE8- can not hanlde call slice() on NodeList, need create a new array w loop
  u.nodelistToArray = function (obj) {
    if (u.isNodeList(obj)) {
      return ArrayPrototype.slice.call(obj);
    }
    return null;
  };

  /* .map(list, iterator, [context])
   - map collection and return new array
   - .map([1,2,3], function (value) {return num +1})
   - .map({one: 1, two: 2}, function(value, key) {return})
   * */

  // .filter


  // Regular Expression
  // ------------------
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  //var re1 = /less/ig; //regular expression literal. i-case insenstive g-global
  //var re2 = new RegExp("less"); //RegExp obj

  u.escapeRegExp = function (string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  u.replaceText = function (text, match, replacement) {
    var re = new RegExp(match, "i"); //dynamic regular expression, instead of //
    text = text.replace(re, replacement);
    return text;
  };

  return u;
});
