//grunt serve to run app
//grunt test
//http://localhost:9001/
/* underscore analysis
 *
 * http://underscorejs.org/docs/underscore.html
 * http://kangax.github.io/es5-compat-table/
 *
 * TODO:
 * - filter
 * - extend
 * - typeof options.symbol !== "undefined" vs. hasOwnProperty()
 * - Regex helper
 * // Regexes containing the keys and values listed immediately above.
 * - Object.create
 * // underscore examples /playground repo
 * // check string contains certain substring
 * defer, delay, memorize, partial, once,
 * */
define([], function () {
  var u = window.Util = {};
  u.version = "0.1";

  // Basic setup & catch
  var root = this, //window
    ArrayPrototype = Array.prototype,
    ObjectPrototype = Object.prototype;
    FunctionPrototype = Function.prototype;

  // ECMSScript 5 native api
  var nativeForEach = ArrayPrototype.forEach,
    nativeIndexOf = ArrayPrototype.indexOf,
    nativeSome = ArrayPrototype.some,
    nativeFilter = ArrayPrototype.filter,
    nativeKeys = Object.keys,
    nativeIsArray = Array.isArray;

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
  u.isArray = nativeIsArray || function (obj) { // ECMA5 native Array.isArray IE 9+
    return ObjectPrototype.toString.call(obj) === "[object Array]";
  };

  /**
   * @method isArrayLike (obj)
   * @description check if obj is arrayLike ( Array || String || Nodelist || hashtable like (jQ object, which has number type .length ))
   * @param obj {array|string|nodes|hashtable}
   * @returns {Boolean}
   */
  u.isArrayLike = function (obj) {
    if (u.isArray(obj) || u.isNodeList(obj) || (!u.isFunction(obj) && obj.length === +obj.length)) { //check length & type is number and >0, default function.length = 1, object doesn't have .length
      return true;
    }
    return false;
  };

  /**
   * @method .isObject(obj)
   * @description return true if obj is array|object|function|nodelist|hashtable-like, exclude null thought typeof null === "object"
   * @param {Object|Array|Function}
   * @returns {Boolean}
   * @example .isObject([1, 2]); //=true
   */
  u.isObject = function (obj) {
    return obj === Object(obj); // array|object|function
//    return typeof obj === "object"; // array|object|function|null
  };

  /**
   * @method .isPlainObject(obj)
   * @description return true if obj is a pure object, excluding array, function
   * @param {Object}
   * @returns {Boolean}
   * @example .isPlainObject([1, 2]); //false
   */
  u.isPlainObject = function (obj) {
    return ObjectPrototype.toString.call(obj) === "[object Object]";
  };

  u.isDomElement = function (obj) { // Node
    return !!(obj && obj.nodeType === 1); //html dom element
    //or "[object HTMLCollection]"
  };

  u.isUndefined = function (obj) {
    //return typeof obj === "undefined";
    return obj === void 0; //avoid undefined being overrided(js undefined is not a preserved keyword) void 0 safely return undefined
  };

  u.isNull = function (obj) {
    //obj == null will check undefined/null
    return obj === null;
  };

  /**
   * @method .isEmpty (obj)
   * @description check if it's null/undefind & empty array/object/string, don't use it to against number check null,, will return the number, use isNull or isUndefined
   * @example u.isEmpty("") === true; u.isEmpty(null) === true; u.isEmpty(" ") === false; u.isEmpty(0) === true;
   * @param obj {array|string|object|hastable}
   * @returns {boolean}
   */
  u.isEmpty = function (obj) {
    // validate
    if (obj == null ) { return true; } // null/undefined
    // if obj is array/arrayLike/string, check length != 0
    if (u.isArrayLike(obj)) { return obj.length === 0; }
    // if obj is object, return size
    if (u.isObject(obj)) {
      return u.size(obj) === 0;
    }
    // return
    return true;
  };

  /**
   * @method .isUndefinedOrNull (obj)
   * @description not in native Underscore lib, a helper for check value !=null &&!=undefined
   * @example
   * @param
   * @returns
   */
  u.isUndefinedOrNull = function (obj) {
    return obj == null; //addon to underscorejs
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

  /**
   * .contains (obj, value)
   * - check if array/obj contains a given value ===
   * - doesn't work with string right now
   * @param obj
   * @param value
   * @returns {boolean}
   */
  u.contains = function (obj, value) {
    if (obj == null) {return false;} //validate null/undefined
    // Array.indexOf if supported (not on IE8), and has Array.indexOf method
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
      return obj.indexOf(value) !== -1;
    }
    // Object or IE8 fallback
    return u.some(obj, function (v) {
      return v === value;
    });
  };

  /**
   * @method .each (collection, callback, [context]) ||.forEach()
   * @description iterate/forEach collection and callback on each, be cautious not support this as item, break loop on callback return false
   * @example
   *  .each([1, 2, 3], funciton(value, index, list){console(value)});
   *  .each({one: 1, two: 2, three: 3}, function(value, key, list){});
   * @param collection {Object|Array}
   * @param callback {Funciton}
   * @param context
   * @returns {undefined }
   */
  var each = u.each = u.forEach = function (collection, iterator, context) {
    if (collection == null) {return;} //validate: null/undefined
    var type = ObjectPrototype.toString.call(collection),
      i = 0,
      result;
    // Arraylike obj: array|string|nodelist(no forEach method)||jqObject
    if (u.isArrayLike(collection)) {
      // if support navtive Array forEach(IE9+) and has obj.forEach, then use native forEach, otherwize fallback w for loop
      // NodeList is inherited from host object not from array, so don't have forEach, map, filter API
      if (nativeForEach && collection.forEach === nativeForEach) { //Prefer use feature detection instead of type detection
        collection.forEach(iterator, context);
      } else { // fallback w for loop
        var len = collection.length; // better performance
        for (; i < len; i++) {
          result = iterator.call(context, collection[i], i, collection);
          if (result === false) {break;} //return false to break loop
        }
      }
    // object
    } else if (u.isObject(collection)) {
      for (i in collection) {
        if (u.has(collection, i)) { //take effect only on direct properties
          //context = context || collection[i]; //make this as context for the item in object
          result = iterator.call(context, collection[i], i, collection);
          if (result === false) {break;}
        }
      }
    }
  };

  // General type check: isNodeList, isHTMLCollection, isString, isNumber, isFunction, isArguments, isDate, isRegExp
  each(["NodeList","HTMLCollection", "String", "Number", "Function", "Boolean", "Date", "RegExp", "Arguments"], function (value) {
    //typeof value === "string"
    u["is" + value] = function (obj) {
      return ObjectPrototype.toString.call(obj) === "[object " + value + "]";
    };
  });

  /**
   * @method .isNaN (obj)
   * @description is the given value a NaN (not a number), different from native isNaN, here only obj is NaN returns true. doing a strict check doesn't allow coersion as native. isNaN() where isNaN(undefined) =
true
   * NaN - Not-A-Number,NaN values are generated when arithmetic operations result in undefined or unrepresentable values. e.g. var a = parseInt("abc");//NaN
   * NaN cannot test with equality(==, ===) NaN == NaN //false use isNaN(NaN) to test
   * @example
   * @param obj {number|NaN}
   * @returns {boolean}
   */
  u.isNaN = function (obj) {
    // native isNaN() does not check typ, will do coercion. isNaN("") == false; //"" converted to 0 isNaN("37") == false //"37" converted to 37
    // NaN is the only number which does not equal itself
    return u.isNumber(obj) && obj != +obj;
  };

  /**
   * @method .isFinite (obj)
   * @description is the obj a finite number, return false when obj is Infinity/-Infinity/undefined/null or non-covertable string "ab"
   * @returns {boolean}
   */
  u.isFinite = function (obj) {
    // native isFinite(obj) == false when obj is Infinity/-Infinity/NaN
    return isFinite(obj) && !isNaN(parseFloat(obj)); //isNaN will filter out when obj is NaN, parseFloat covert the string to float number
  };

  /*
   * @ Collection / Hashtable-like
   * ----------------------------------
   */
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

  // .filter returns new array with items that pass the test fn
  // .filter(arr, callback)
  // .filter([1, 2, 3], function () {})
  u.filter = function (array, callback) {

  };

  /**
   * @method .map(obj, callback, [context])
   * @description return array of values by mapping/iterate each item in list with a transform function/callback
   * @param {Array|Object} obj
   * @param {Function} iterator
   * @param {Object} [context]
   * @returns {Array}
   * @example
   *  .map([1,2,3], function (value) {return num +1}) //[2,3,4]
   *  .map({one: 1, two: 2}, function(value, key) {return value}) //[1,2]
   */
  u.map = function (obj, iterator, context) {
    //if obj array & support array.map, use native array.map (IE9+)
    if (u.isArray(obj) && ArrayPrototype.map) {
      return obj.map(iterator, context);
    }
    //object & native map fallback
    var results = [];
    each(obj, function (value, key, list) {
      results.push(iterator.call(context, value, key, list));
    });
    return results;
  };

  /**
   * @method .pluck (obj, key)
   * @description extract certain property from arrays of objects(table) as values array, a simple usage of .map
   * @param {Object} obj
   * @param {String} key
   * @returns {Array}
   * @example .pluck([{name: "test1", age: 10}, {name: "test2", age: 11}], "age"); //= [10, 11]
   */
  u.pluck = function (obj, key) {
    if (!u.isObject(obj)) { throw new TypeError("Invalid obj"); }
    var arr = u.map(obj, function (value) {
      return value[key];
    });
    return arr;
  };

  /**
   * @method .pairs (obj)
   * @description convert an object{key, value] to an array of [key, value]
   * @param {Object}
   * @returns
   * @example .pairs({name: "test", age: 23}); //[["name", "test"], ["age", 23]]
   */
  u.pairs = function (obj) {
    var arr = [];
    each(obj, function (value, key) {
      arr.push([key, value]);
    });
    return arr;
  };

  /**
   * @method .reduce (obj, callback, initial, context)
   * @description build up a single value(accumulator) based on an object
   * @param {Object} obj
   * @param {Function} iterator
   * @returns {Number|String}
   * @example .reduce([1, 2, 3], function(sum, num){ return sum + num; }, 0}; //=6
   */
  u.reduce = function (obj, iterator, initial, context) {
    // validate
    // if isArray and native array.reduce(callback, [initial]) is supported (IE9+)
    if (u.isArray(obj) && ArrayPrototype.reduce) {
      return initial ? obj.reduce(iterator, initial) : obj.reduce(iterator);
    }
    // if object and array.reduce fallback use each
    var result;
    each(obj, function (value, key, list) {
      if (!initial) {
        result = value; //first time
        initial = true;
      } else {
        result = iterator.call(context, initial, value, index, list);
      }
    });
    return result;
  };

  //reduceRight


  /*
   * @ Array & Array-like
   * ----------------------------------
   */
  /**
   * @method .max (obj, [callback], [context])
   * @description return the maximum value in the array, or object with criteria
   * @example .max([2, 3, 1]); .max([{age:1}, {age:21}], function(value, index, context) {retun this.age;})
   * @param obj {object/array}
   * @returns {number}
   */
  u.max = function (obj, callback, context) {
    // validate
    if (!callback) {
      // if no callback and empty obj return -Infinity
      if (u.isEmpty(obj)) { return -Infinity; }
      // if no callback && obj is array like & length < 65535(webkit has limit on arguments length < 2^16), use Math.max.apply
      if (u.isArrayLike(obj) && obj.length < 65535) {
        return Math.max.apply(Math, obj); //get max number from "numeric" array
      }
    }
    // if callback, then loop w each, and setup criteria
    var max, computed;
    each(obj, function (value, index, list) {
      computed = callback.call(context, value, index, list);
      if (u.isUndefined(max) || computed > max) { max = computed; } //firstItem or encouter bigger item
    });
    // return
    return max;
  };

  /**
   * @method .min (obj, [callback], [context])
   * @description return the minimum value in the array, or object with criteria
   * @example .min([2, 3, 1]); .min([{age:1}, {age:21}], function(value, index, context) {retun this.age;})
   * @param obj {object/array}
   * @returns {number}
   */
  u.min = function (obj, callback, context) {
    // validate
    if (!callback) {
      // if no callback and empty obj return Infinity
      if (u.isEmpty(obj)) { return Infinity; }
      // if no callback && obj is array like & length < 65535(webkit has limit on arguments length < 2^16), use Math.max.apply
      if (u.isArrayLike(obj) && obj.length < 65535) {
        return Math.min.apply(Math, obj); //get min number from "numeric" array
      }
    }
    // if callback, then loop w each, and setup criteria
    var min, computed;
    each(obj, function (value, index, list) {
      computed = callback.call(context, value, index, list);
      if (u.isUndefined(min) || computed < min) {
        min = computed;
      }
    });
    // return
    return min;
  };

  /**
   * @method .sort(array, [compareFn])
   * @description use native array sort, if no compareFn, array is sorted using string dictionary order(1, 10, 2) compareFn(a,b) if return value > 0, sort b to lower index than a
   * @example .sort(array, function(a,b){return b-a}) //desc
   * @param
   * @returns
   */
  u.sort = function (array, compareFn) {
    // validate
    if (!u.isArray(array)) { return array; }
    // return
    return array.sort(compareFn);
  };


  /**
   * .unique(array)
   * - unique: array remove duplicate
   * - u.unique([1,1,2]) //=1,2
   * - use to remove string duplicate
   * @param array
   * @returns {*}
   */
  u.uniq = u.unique = function (array) {
    if (array == null) {return null;}
    var seen = [];
    if (u.isArrayLike(array)) {
      each(array, function (value, index) {
        if (!u.contains(seen, value)) {
          seen.push(value);
        }
      });
      return seen;
    }
    return null;
  };

  // union: concat/merge 2 array and return array w unique value
  u.union = function () {
    // use apply(thisArg, [argsArray]) when don't know specific arguments
    return u.unique(ArrayPrototype.concat.apply(ArrayPrototype, arguments));
  };

  //without, partition, intersection, difference, object, flatten

  // covert NodeList(arraylike) to Array, so an use Array ES5 API forEach, map, filter
  // IE8- can not hanlde call slice() on NodeList, need create a new array w loop
  u.nodelistToArray = function (obj) {
    if (u.isNodeList(obj)) {
      return ArrayPrototype.slice.call(obj);
    }
    return null;
  };


  // .toArray()


  /*
   * @ Object
   * ----------------------------------
   */
   /**
   * @method .keys(obj)
   * @description return array of object keys, work for both object & array, Object.keys(obj) ; //IE9+
   * @param {Object|Array} obj
   * @returns {Array}
   * @example .keys({one: 1, two: 2}) //=["one", "two"]; .keys([1,2]) //=["0", "1"];
   */
   u.keys = nativeKeys || function (obj) {
     // array & object will pass, match w Object.keys() validation
     if (!u.isObject(obj)) { throw new TypeError("Invalid obj"); }
     var arr = [],
      isArray = u.isArray(obj);
     each(obj, function (value, key) {
       key = isArray ? key.toString() : key; // covert array index to string
       arr.push(key);
     });
     return arr;
  };

  /**
   * @method .values(obj)
   * @description return array of object values, work for both object & array
   * @param {Object|Array} obj
   * @returns {Array}
   * @example .values({one: 1, two: 2}); //= [1, 2] .values([1, 2]); //= [1, 2]
   */
  u.values = function (obj) {
    if (!u.isObject(obj)) { throw new TypeError("Invalid obj"); }
    var arr = [];
    each(obj, function (value, key) {
      arr.push(value);
    });
    return arr;
  };

  /**
   * @method .size (obj)
   * @description return size of object|array|string|nodelist|hashtable like use keys.length, or if hashtable e.g jquery object which has .length=num
   * @example .size({one: 1, two: 2}) //=2, .size([1, 2]); //=2
   * @param obj {object|hashtable like}
   * @returns {number}
   */
  u.size = function (obj) {
    if (!u.isObject(obj) && !u.isString(obj)) { return 0; }
    return (obj.length === +obj.length) ? obj.length : u.keys(obj).length; //array|hashtable|obj
  };

  /* @@ .extend (target, *source)
   - shallow copy sources object direct properties to target obj (object as reference not deep clone), last source will override previous source property with same name
   - .extend({}, {name: ""})
   * */
  /**
   * @method .extend (obj, [obj1, obj2])
   * @description extend a targe object with passed-in objects property override
   * @param {Object} obj - extend target
   * @returns {Object}
   * @example .extend({}, {name: "test"}); //={name: "test"}
   */
  u.extend = function (obj) {
    //validate obj, source is obj,otherwise return itself
    if (!u.isObject(obj)) { return obj;}
    //loop *sources and loop property
    var sources = ArrayPrototype.slice.call(arguments, 1);
    each(sources, function (source) {
      if (u.isObject(source)) {
        each(source, function (value, key) {
          obj[key] = value;
        });
      }
    });
    return obj;
  };


  // .clone  deepcopy

  /**
   * @method .isEqual (a, b)
   * @description deep value comparison (recursion) of two object/array instead of reference, jquery has a deepEqual()
   * https://github.com/joyent/node/blob/e4cef1a0833e6d677298600e205a142d15639bf2/lib/assert.js#L221-L233
   * @example .isEqual([1, 2], [1, 2]), .isEqual({names:[1,2]}, {names:[1,2]})
   * @param {Object|Array} a
   * @param {Object|Array} b
   * @returns {Boolean}
   */
  var deepEqual = u.isEqual = function (a, b) {
    // primitive value, use strict equal check value & type
    if (a === b) {
      return true;
    } else {
      // object by reference type, check value
      // if not same type, exit
      var type = ObjectPrototype.toString.call(a);
      if (type !== ObjectPrototype.toString.call(b)) { return false;}
      switch (type) {
        // primitive value
        case "[object String]":
        case "[object Number]":
        case "[object Boolean]":
          return a === b;
        // date
        case "[object Date]":
          return a.getTime() === b.getTime();
        //TODO:
        //regexp
        //arguments
        // object & array
        case "[object Object]":
        case "[object Array]":
          //test null/undefined
          if (u.isUndefinedOrNull(a) || u.isUndefinedOrNull(b)) { return false; }
          //test identical prototype
          if (a.prototype !== b.prototype) { return false;}
          //test number of owned properties
          var keyA = u.keys(a), //[1,2] will return [0,1]
            keyB = u.keys(b);
          if (keyA.length !== keyB.length) { return false; }
          //sort order bay alpha for easy compare of object
          keyA.sort();
          keyB.sort();
          //test key string equal
          var i, len;
          for (i = 0, len = keyA.length; i < len; i++) {
            if (keyA[i] !== keyB[i]) { return false; }
          }
          //deep compare recursively each property
          for (i = 0, len = keyA.length; i < len; i++) {
            if (!deepEqual(a[keyA[i]], b[keyA[i]])) { return false; }
          }

          return true;
      }
    }
  };

  /*
   * @ Function
   * ----------------------------------
   */
  /**
   * @method .delay(fn, time, *arguments)
   * @description delays a function w setTimeout after certain time
   * @example
   * @param fn {function}
   * @param time {int}
   * @returns timestamp of setTimoeut
   */
  u.delay = function (fn, time) {
    var args = ArrayPrototype.slice.call(arguments, 2); //put 3rd + params to array
    return setTimeout(function () {
      return fn.apply(null, args); //if this context= null/undefined, will use window instead
    }, time);
  };


  /**
   * @method defer
   * @description defers a function, schedule it to run after the current call stack has cleared. =setTimeout(fn, 1), buys you some time until the DOM elements are loaded
   * @param fn {function}
   * @returns timestamp
   */
  u.defer = function (fn) {
    var args = ArrayPrototype.slice.call(arguments, 1);
    return u.delay.apply(u, [fn, 1].concat(args));
  };

  /**
   * @method bind (fn, context, *arg)
   * @description returns a function that bind an object as this context
   * @example fn = u.bind(fn, {name: "walmart"}, argument); fn();
   * @param fn {function}
   * @param context {object}
   * @returns function
   */
  u.bind = function (fn, context) {
    //IE9+ nativeBind
    //setTimeout(this.afterRender.bind(this), 0); // event handler, setInteval, ajax will change this context
    var args = ArrayPrototype.slice.call(arguments, 2);
    if (FunctionPrototype.bind) { return fn.bind(context, args); }
    return function () {
      return fn.apply(context, args);
    };
  };

  /**
   * @method .bindAll(obj, *methodNames)
   * @description bind callback method(event, ajax) to to an object as context (e.g. click, ajax, setTimeout)
   * @example .bindAll(buttonView, 'onClick', 'onHover')
   * @param obj {object}
   * @returns obj
   */
  u.bindAll = function (obj) {
    var fns = ArrayPrototype.slice.call(arguments, 1);
    each(fns, function (fn) {
      obj[fn] = u.bind(obj[fn], obj);
    });
    return obj;
  };

  // Memoize an expensive function by storing its results.

  /*
   * @ Regular Expression Util
   * ----------------------------------
   */
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  //var re1 = /less/ig; //regular expression literal. i-case insenstive g-global
  //var re2 = new RegExp("less"); //RegExp obj

  u.escapeRegExp = function (string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  u.replaceText = function (text, match, replacement) {
    var re = new RegExp(match, "i"); //dynamic regular expression, instead of // literal
    text = text.replace(re, replacement);
    return text;
  };

  return u;
});
