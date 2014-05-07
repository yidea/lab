/*
 * @ Effective JS - 68 ways
 * ----------------------------------
 */
var _ = require("underscore");

/*
 * @ 1 ES5 and JS Compatibility
 * ----------------------------------
 * - decide which version js ur app will support ES5? (IE9+)
 * - ES5 use "use strict" to do strict-mode check(e.g. not allow redefine arguments/variable), env doesn't support ES5 will allow it
 * - use "use strict" to make code error-proof
 */
(function(){ //use iife create file's own scope and avoid "use strict" will be ignored when files are concatenated
  "use strict"; //only recognized at top of script/function, otherwize not working
  function fn() {}
}());

/*
 * @ 2 Floating-Point Number (Inaccurate)
 * ----------------------------------
 * - JS has only 1 number type - stored as 64 bit floating point number (doubles)
 * - when doing number calculation, number is coverted to integer and then back to floating-point again
 * - Floating-point number is Inaccurate, can only produce approximate result and have rounding errors.
 * - Work around: when need accuracy(money), convert to Integer to do the calculation then covert back (with in integer range 2^53 to -2^53)
 *
 */
typeof 17 === typeof 98.5; //number
//console.log((8).toString(2)); //=1000 binary, parseInt("1000", 2); //8
var num1 = 0.1 + 0.2; // 0.30000000000000004
var num2 = (10 + 20)/100; // 0.3, covert to integer to calcuate accurately

/*
 * @ 3 Implicit Coercions
 * ----------------------------------
 * - js is dynamic and will do variable coercion when doing arithmetic and concat
 * - === vs. ==:  == allow implicit coercion, it can cause bug
 * - 7 if(false) value: false/null/undefined/NaN/0/-0/"", all other value can convert to true in JS. Be careful with the case
 * 0/"" is returned as result. better use if(typeof a !== "undefined") of if(a != null)
 */
//7
var test;
if(test) {} //false if 7 value: false/null/undefined/NaN/0/-0/""
if ("1" == true) {} // == will covert both to number first, then compare
console.assert(3 + true === 4, 3 + true); //"true converted to 0"
console.assert("17" * 3 === 51, "17" * 3); // *,/ favor number, convert string to number
console.assert( 2 + "3" === "23", 2 + "3"); // concat string favor string, number will be converted to string first
test = "output" + {name: "yi"}; //Object are covnerted to string by using Object.prototype.toString(obj) == [object Object]
// u can add .toString() method in the object instance to control the converted value
console.assert("J" + {toString: function () {return "S";}} === "JS", "J" + {toString: function () {return "S";}}); //object covert to string use toString()
console.assert(2 * {valueOf: function () {return "3";}} === 6, 2 * {valueOf: function () {return "3";}}); //object convert to number use valueOf()

/*
 * @ 4 Five Primitives & Object Wrapper
 * ----------------------------------
 * - Five Primitives: string, number, boolean, undefined, null (though typeof null === "object")
 * - Primitives will pass/copy by value not by reference
 * - Primitives is for simple data &performance, don't add properties to it, it's object's job
 */
var strLiteral = "hello"; //string literal will NOT use string constucture
var strWrapper = new String("hello"); //string object wrapper use string constucture, u cannot compare 2 string object (reference)
console.assert(typeof strLiteral === "string", typeof strLiteral);
console.assert(typeof strWrapper === "object", typeof strWrapper);
strLiteral.toUpperCase(); //string object wrapper mainly exist for their util. the string primitive will be wrapped with a temporary new String() object and use the util then return the value to a new string primitive, then dump the strig object wrapper

/*
 * @ 5 Avoid comparing w == & mixed types
 * ----------------------------------
 * - == will do coercion if 2 variables are of different type. e.g. null == undefined; //true. avoid == because u can not control the possible conversion object.toString() [object, Object]
 * - use === to disallow coercion compare, also make sure both side are in same type e.g +unary convert string value to number
 * if (obj.length === +obj.length) {}
 */
var date = new Date("2014/3/18");
console.log(date); //TODO:debug
if (date == "2014/3/18") {} //=false date.toString() = "Tue Mar 18 2014 00:00:00 GMT-0700 (PDT)"

/*
 * @ 6 Auomatic Semicolon; Insertion
 * ----------------------------------
 * - js has a token parsing technique to auto insert semicolon if omitted in the code, but it's not smart enough, esp when doing file cocat, only the last one get ;, that's why need ;(function(){}())
 * - Avoid omit semicolon, it might cause issue if code need concat and compress, don't rely on the person who is not smart enough
 */

/*
 * @ 7 Think of String as array of 16 bit code unit
 * ----------------------------------
 * - JS string consist of 16 bit code unit, not unicode code points
 * - for unicode point > 2^16 are representd in js by 2 code unit e.g. (Chinese), u can not rely on .length, .charAt for them
 */

/*
 * @ 8 Minimize use of Global object (Host object)
 * @ 9 Always declare var local variable
 * ----------------------------------
 * - use Global object will pollute common namespace, and very likely to be override by others, always var varialbe and use closure /AMD
 * - use Global for feature detection is good practice, instead of UA
 * - declar local variable without var will create the variable in global object
 * - if need to use, create a sub namespace e.g. window._WML
 */

/*
 * @ 10 Avoid using with
 * ----------------------------------
 * - with: avoid repeated reference to object, but it requires a searching of entire prototype chain, so it's much slower, use a short variable name can avoid using with
 * and get much bettern performance
 */

/*
 * @ 11 Closure
 * @ 13 IIFE to create local scope
 * ----------------------------------
 * - Closure: function returned in function - created inner&outer scope, inner can access outer variable by reference (not by value). This is where the click 1-5 end up with 5..5
 * - IIFE to rescue, force creation of a local scope to store the value j=i, so each fn will have it's own local scope to lookup to.
 * - IIFE downside: cannot use break/continue, this/arguments meaning might changed
 */
function wrapElements(a) {
  var result = [];
  for (var i = 0, n = a.length; i < n; i++) {
    result[i] = function() { return a[i]; };
    // IIFE to rescue
//    (function(j){ //or var j=a
//      result[i] = function() { return a[j]; };
//    }(i));
  }
  return result;
}
var wrapped = wrapElements([10, 20, 30, 40, 50]);
var f = wrapped[0];
console.assert(f() === undefined, f()); //i=5, a[5] undefined

/*
 * @ 12 Variable Hoisting
 * ----------------------------------
 * - JS use Lexical scoping, scope is created by function not block{}, try to avoid var in if/for block also avoid for(var i = 0;)
 * - var a = 0; //variable declaration and assignemnt, js will hoist the declaration to top, only assign when run to the code (function is first-class, has both hoisted )
 * - BP: Manually hoisting local variable declaration to top to avoid confusion
 */
console.assert(a === undefined, a); //only get var a;
var a = 0; //= var a; a = 0;

/*
 * @ 14 Named Function Expression
 * ----------------------------------
 * - 2 way of declare function: function a(){}; and function expression w var f=function(){} (not hoisting assigment)
 * - Named Function Expression is good for debug stack trace for function
 * - Beaware it might pollute scope with Ojbect.prototype in ES3
 */
var f = function find(tree, key) {
  if (!tree) { return null;}
  if (tree.key === key) { return tree.value; }
  return find(tree.left, key) || find(tree.right, key);
};

/*
 * @ 15 Function Declaration Hoisting/Scope
 * ----------------------------------
 * - Funciton is first class, will hoist both declaration and assignment, if/for{} block will not stop the hoist, so code function on top 
 */
if (a) {
  function f() {return "test";} //even if a==false, function still hoist, if want dynamic then use function expression w var
}

/*
 * @ 16,17 Avoid eval()
 * ----------------------------------
 * - eval("var a = 'local';"); // pollute scope, not safe, interpreted as global variable
 */

/*
 * @ 18: Function|Method|Constructor
 * ----------------------------------
 * - Function has 3 usage pattern in js: Function|Method|Constructor
 */
// 1 Funciton - a common util for transform input/output, this -> global scope
function sayHi(name) {
  return "hi" + name;
}
// 2 Method - object's propery is a function expression, singleton, this -> object
var util = {
  name: "util",
  sayHi: function () {
    return "hi" + this.name;
  }
};
// 3 Constructor - create a new Object instance via constuctor template(object factory), this -> new object
function User(name) {
  this.name = name; //new User("user");  when new, implicit return new object and set this -> new object
}

/*
 * @ 19 use function w Callback/Higher-Order function
 * ----------------------------------
 * - function take funciton as argument(callback w return) or return funciton as result (powerful and expressive) e.g. _.each(), _.map()
 * - use it when util need iterate items, or see repeatly code in the same pattern
 */
var sort1 = [1, 3, 2].sort(function (a, b) {
  if (a < b) { return -1; } // no change -> asc
  if (a > b) { return 1; } // change
  return 0;
});
console.assert(sort1.toString() === [1, 2, 3].toString(), sort1);

/*
 * @ 20,21 fn.call()/fn.apply() w a custom caller/context and arguments
 * @ 25 fn.bind() bind caller w context and return the new fn (not run)
 * @ 26 fn.bind() can be used to curry function ( bind funciton to a subset of it arguments)
 * ----------------------------------
 * - run the fn w defined caller/context-this of the funciton/ borrow the function from others
 * - fn.call(caller, arg1, arg2 ..); use .call() when args are known(number)
 * - fn.apply(caller, [arguments]); use .apply() when args are unknown/dynamic e.g. sum of number
 */
console.assert(Object.prototype.toString.call("test") === "[object String]", "string");

/*
 * @ 22 Use arguments to accept dynamic parameters
 * @ 23 Never modify arguments object/treat array-like but not array, use clone w [].slice
 * @ 24 Use a variable to ref to extenal arguments, every function has its own implicit arguments
 * @ 29 avoid using arguments.callee, arguments.caller (they are depend on env)
 * ----------------------------------
 * - js function provides an implicit local varaible arguments
 * - arguments is array-like object, has index/length, but no interface of shift/push, so don't modify arugments, also it's by referecne
 * - Array.prototype.slice.call(arguments, 1) to extract copy of arguments
 */
//implicit var arguments in every function runtime
function average() {
  var i, len, sum = 0;
  for (i = 0, len = arguments.length; i < len; i++) {
    sum += arguments[i];
  }
  return sum/len;
}
// arguments is array-like but not array
function callMethod(obj, method) { // w [].slice returns a new array
  return obj[method].apply(obj, Array.prototype.slice.call(arguments, 2));
}
// bind
var stringBuffer = {
  entries: [],
  add: function (s) {
    this.entries.push(s);
  },
  concat: function () {
    return this.entries.join("");
  }
};
["abc","123"].forEach(stringBuffer.add.bind(stringBuffer)); //if not bind, caller forEach will refer this to window
// avoid caller and callee

function factorial(n) { //n! = n*(n-1)!
  return (n <= 1) ? 1 : (n * factorial(n - 1)); // instead of arguments.callee(n-1)
}

/*
 * @ 30, 31, 32 prototype, Object.getPrototypeOf(), __proto__
 * ----------------------------------
 * - JS object/function inheritance is based on prototype rather than class, but same pattern (constructor + prototype method + new init instance)
 * - Class is a dp consist of constructor function and associated prototype for methods
 * - Prefer use ES5 Object.getPrototypeOf() instead of __proto__, but can use __proto__ as fallback in non-ES5 support browser
 * - use Object.create() to customize prototype for new instance
 */
User.prototype.toString = function () {
  return this.name;
};
var user1 = new User("abc"); // when new, inherit/chain from User.prototype
console.assert(Object.getPrototypeOf(user1) === User.prototype, Object.getPrototypeOf(user1)); //some env e.g. firefox has user1.__proto__ === User.prototype

/*
 * @ 33 Make Constructor new-Agnostic
 * ----------------------------------
 * - Constructor rely on new operator, if no new then it's just a function return undefined and this->global, need some protection
 * - Object.create(prototoype) ES5 take a custom prototype object as direct prototype chain reference and return a new object that inherits from it
 */
function Person(name) {
  var self = this instanceof Person ? this : Object.create(Person.prototype);
  self.name = name;
  return self; //otherwize will return this
}
// Object.create() polyfill
if (typeof Object.create === "undefined") {
  Object.create = function (prototype) {
    var C = function(){};
    C.prototype = prototype;
    return new C();
  };
}

/*
 * @ 34 Store method on Prototype
 * ----------------------------------
 * - can store method on Constructor or on Prototype, but Constructor methods will be copied to each instance, Prototype method will be singleton and shared accross all instances
 */
