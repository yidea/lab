/*
 * Design Pattern & Backbone
 * -------------
 * - Reading:
 * JSIQ
 * http://addyosmani.com/resources/essentialjsdesignpatterns/book/
 * http://shichuan.github.io/javascript-patterns/
 *
 * - 3 categoies: Creational, Structural and Behavioral
 * - Gang of Four (GoF)
 *
 */

/*
 * @ MVC
 * -------------
 * - MVVM, MVP
 * - e.g. Backbone
 */

/*
 * @ Module Pattern
 * -------------
 * - 148
 * - e.g. IIFE,commonJS, AMD, jQuery
 */

/*
 * @ Continuation-Passing style
 * -------------
 * - a function take a callback as explicit continuation
 * - e.g. each/ajax callback
 */
function some(obj, callback, context) {
  if (obj == null) {return false;} //validate null/undefined
  // if array and native support
  if (nativeSome && obj.some === nativeSome) {
    return obj.some(callback, context);
  }
}

/*
 * @ Chaining method
 * -------------
 */


/*
 * @ Promise
 * -------------
 * http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promise-terminology
 */


