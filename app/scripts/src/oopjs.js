/*
 * Principle of OOP JS
 *
 * @ TOC
 * -------------
 * - Object Pattern
 * Reading
 * */

/*
 * @ 1 Primitive types (5)
 * ----------------------------------
 * - stored/passed by value in JS Variable Object
 */
// 1 Boolean
var isFound = true;
console.assert(typeof isFound === "boolean", typeof isFound);

// 2 Number (floating-point double 64 bit)
var count = 25;
var price = 11.99;
console.assert(typeof count === "number", typeof count);

// 3 String
var str = "yi";
console.assert(typeof str === "string", typeof str);

// 4 Null
var obj = null; //placeholder for object, set obj to null will dereference obj/free up the memory
console.assert(typeof obj === "object", typeof obj);

// 5 Undefined
var ref;
console.assert(typeof ref === "undefined", typeof ref);

// Primitive wrapper & methods
// 3 primitive wrapper(String, Number, Boolean)
// convert to temp object via primitive wrapper, use the method, then covert to primitive
var sub = str.substring(0, 2);
price = price.toFixed(1); //12.0
var char = str.charAt(0);
// behind the scence
var temp = new String(str);
var char = temp.charAt(0);
temp = null; // dereference primitive wrapper


/*
 * @ Reference types (Object)
 * ----------------------------------
 * - stored/passed by reference pointer to Memory [1,2] !== [1,2]
 * - object is a hashtable-like w key/pair
 * - Complex types: Array, Function, Object, Date, Error, RegExp
 */
// create obj w Literal (dosen't call constructor) vs new (call constructor)
var obj1 = {name: "test"}; //(doesn't call new Object() constructor)
var obj2 = new Object();
var arr1 = [1, 2]; //array literal
obj2.name = "test";
function fn1() {} //function literal
var numbers = /\d+/g; //regualr expression literal

// identify reference types
console.assert(Object.prototype.toString.call(arr1) === "[object Array]", Object.prototype.toString.call(arr1)); //typeof is not sufficent will return object
console.assert(fn1 instanceof Function, fn1 instanceof Function); //or use instanceof
console.assert(Array.isArray(arr1), Array.isArray(arr1)); //ES5


/*
 * @ Function
 * ------------------------------
 * - Call/Apply/Bind
 * http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
 *
 */


/*
 * @ Object Pattern
 * ------------------------------
 * - Module Pattern (Private and public member)
 *
 */


/* @ Module Pattern
 * - Great for need to create singleton w private & public member, e.g. Util
 * - object-creation pattern to using IIFE create a singleton obj w private data and returns an object as public api
 * - IIFE (Immediately invoked function epxression) (function () {}()); - create a function scope to store private/local data
 * - Revealing Module Pattern: move function code block from return object to IIFE and assign to public by reference
 * */

var person = (function () {
  // private data w _
  var _age = 25;
  function _getAge() {return _age;}
  //public
  return {
    getAge: _getAge //revealing module pattern
  };
}());

console.assert(person.getAge() === 25, "getAge() === 25");

/* @ new Constructor Pattern
* - Great for need to create multiple instance which has it's own private & public member, UI dropdown
* - create instance w new, this refer to object, prototype is shared across instance
* */
function Car(name) {
  //private
  var time = "2014"; //private- accessible in constructor only
  //public
  this.name = name;
  this.getTime = function () {return time;};
}
Car.prototype.getName = function () {return this.name;}; //can not access time which is priate, can only access this.prop

var car1 = new Car("honda");
console.assert(car1.getTime() === "2014", "car1.getTime() == 2014");
console.assert(car1.getName() === "honda", "car1.getName() == honda");

// IIFE + Constructor

var Animal = (function () {
  var time = "2014"; // every instance share this
}());








