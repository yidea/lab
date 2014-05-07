//http://jsbin.com/qecog/1/edit
/*
 * p 38-69-76-99 -111
 *
 * @ TODO
 * - Github + ports (MEAN)
 * - BB + thorax
 * - JS dp + ds
 *
 * @ My code
 * html5.html //for senmantic html
 * css3.scss //for css
 * clientjs/alg-lib/dp-lib/jquery-lib.js  //for js
 * ux.js //for ux
 * rs.js //for ports
 * web-performance.js
 *
 * @ TOC
 * - Thoughts
 * - Hoisting
 * - Closure & Function & IIFE
 * - How browser works (Reflow, Repaint)
 * - Garbage Collection(GC) & Memory Leak
 * - Web Performance & Security (DNS, HTTPS, XSS, CSRF)
 * - Node.js as Server side
 * - Regular Expression
 *
 * @ Thoughts
 * @@ Goal:
 * - great tech mentor/starEngineerLead/growth (Not a lead position/one-man-shop) - FE automation/git flow/qa/code style and review can indiate it, e.g. Ryan R, high quality colleges u can learn from, opportunies to work on different projects. also check glassdoor for review on engineer culture (NO Micro manager) e.g. g ui prototyper. engineer-driven http://eng.wealthfront.com/2013/11/how-to-find-great-engineering-culture.html
 *
 * @@ Places
 * - TPFLBY or fallback to startup w great mentor&nodejs fullstack e.g. Square, Stripe, Airbnb, Expa, Pinterest
 * - follow passion/interest nodejs/mobile full stack, make impact
 * - study from Amazon
 *
 * - pp UIE @billwscott: expert knowledge of algorithms, design patterns, and componentization approaches. bb,nodejs, bb
 * - T WebUI: cs (common data structures and algorithms, profiling/optimization), TDD, HTTP, cross browser, modular css/js
 * - Airbnb UIE: cs fundamental, js oop +dp, mvc, crossbrowser, performance
 *
 *
 * @@ Methods
 * - Build ur Github & site w MEAN + BB, CSS example/animation w codePen study
 *
 * @@ Books
 * - BB fundamental and design pattern, Thorax
 * - Data Structures and Algorithms with JavaScript (3/31)
 * - Professional JavaScript for Web Developers, The Principles of Object-Oriented JavaScript (Nicholas)
 * - Effective JavaScript (Mozilla)
 * - Object-Oriented JavaScript: Create scalable, reusable high-quality JavaScript applications and libraries (FB)
 * - JavaScript Patterns (FB)
 * - Pro JavaScript Design Patterns (Twitter)
 * - Cracking the Coding Interview
 * - Element of programming interviews
 * - 深入浅出Node.js
 *
 * @@ Questions
 * http://www.w3cplus.com/css/front-end-web-development-quiz.html
 * https://github.com/darcyclarke/Front-end-Developer-Interview-Questions
 *
 *
 * @@ Design System/Module Question
 * - Look at FE architecture and property&methodAPI ds (input/output, input empty, input large size)/alg, dp(eventEmitter/pubsub, observer, callback, promise)
 * e.g. design/implement a tab, calendar(conflict?), datatable, modal, afix
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture-2012
 *
 * - General Approach:
 * --  Think in a Functional programming way (a process machine on input/output and validate unqualified ones)
 * --  Ds/Alg: what should be used to have small bigO
 * --  Module = Data + View(widgets - reusable UI e.g. tab/carousel)
 * --  loose coupling, make module independent (Access it's own dom an use event listen Backbone way)
 * --  What's data/view, DP: is this a MVT or MVVM (data and view 2 way binding?)
 * --  Event driven architecture for scalable. Provide event bus/pubsub for widget communication
 * Backbone Aura https://github.com/aurajs/aura
 * --  Code org: modular AMD, jQ plugin? Async/Sync
 * --  html/css/js content/presentation/behavior seperation
 * --  Design API: based on module behavior: init, open, (using event trigger)
 * --  choose the right approach then lookat github code (don't invent wheel), consider star # update frequence, issue# and contributor, unit test/code coverage?
 * --  BDD & Unit test
 *
 * @@ Product improvement
 * - UX and competitor feature compare
 * http://www.hongkiat.com/blog/things-twitter-can-learn-from-sina-weibo/
 * - Microdata for SEO, semantic, accessiblity, usablity
 * http://code.tutsplus.com/tutorials/html5-microdata-welcome-to-the-machine--net-12356
 * Seo boost use h2 instead of h5 and semantic element
 * - Accessiblity and keyboard navigation/shortcut
 * e.g. Gmail G + I, U .. tabindex=-1 to be focusable for dialog, ESC to exist dialog
 * http://www.slideshare.net/nzakas/the-pointerless-web
 * - How u output page debug info (debug mode)
 * - UI inconsistancy (live style guide, OOCSS, use Stylus/Scss)
 * - CSS/JS performance
 * CSS get evaluated from right to left,
 * http://snook.ca/archives/html_and_css/css-parent-selectors
 * http://addyosmani.com/blog/removing-unused-css/
 * - Holy Grail layout w SEO frident, html in seo ordercenter -> leftnav is appear in second place,center is in first in html
 *
 * @@ Culture & Behavioral
 * - What's ur weakness: 1 still need more learn/experience in FE, exp. nodejs.  2. designer eye pixel perfect, not a good idea when the feature is prototype for A/B, I'm changing the flow w Trello
 * - Why want leave
 * - Exp.: Unprofessional&indicating whiner - Never give a negative point on ur previous company, boss and industry(I said once I knew the gaming industry well enough.. end of story)
 * - Honest, humble and don't exaggerate ur experience/skills (So they will grill u with harder questions, once they found u lie, u r done. e.g. u claimed u code Semantic/Acceissble html in resume, then they asked u to code ur resume in html, and found u are not using <address>, role and micro format, then u r done, in resume don't exaggerate too much detail, give those as bonus in interview and let them find out you also know this and that)
 * - Keep smile, passionate & active
 *
 * @@ ALG & Logic
 * http://blog.yxwang.me/2012/12/job-hunting-in-usa-2/
 * http://www.codeproject.com/Articles/669131/Data-Structures-with-JavaScript
 * http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/
 * http://www.cs.sunysb.edu/~algorith/video-lectures/
 * http://www.youtube.com/playlist?list=PL6jzv-WeF3aFOUhz5YmRHp_AhNZblosLp
 * http://www.growingwiththeweb.com/p/explore.html?t=Interview%20questions
 * https://github.com/duereg/js-algorithms
 * https://github.com/malachaifrazier/JavaScript-Interview-Questions
 *
 * - Speed & Efficiency (Big-O)
 * - string (reverse, count)
 * - array (remove duplicate)
 * - hashtable, hashset
 * - linkedlist implement and reverse (better than array.slice(), save memory)
 * - binary tree (determine is valid BST, in-order iterative binary search tree traversal)
 * - recursion (Fibonacci, Permutation)
 * - sort (bubble, merge, select)
 * - Trie
 *
 * - FE Questions:
 * http://www.w3cfuns.com/thread-5599876-1-1.html
 * http://www.w3cfuns.com/thread-5599890-1-1.html
 * http://www.vikaskbh.com/front-end-engineer-in-san-francisco-solved-code-interview-questions/
 *  Write a function that takes two sorted lists of numbers and merges them into a single sorted list.
 *  Given an array of integers (positive or negative) find the sub-array with the largest sum. or a pair of number sum up to 10
 *  Determine if a given string is a palindrome.
 *  Given a large hash table whose keys are movie names and whose values are a list of actors in those movies, write a function to determine the Bacon number of a particular actor.
 *  $("test").addClass("link").on("click", do) // complexity
 *  Write a function that takes an array of integers and returns that array rotated by N positions. For example, if N=2, given the input array [1, 2, 3, 4, 5, 6] the function should return [5, 6, 1, 2, 3, 4]
 *
 *
 * Design Pattern
 * https://github.com/v0lkan/JavaScript-Patterns
 * - oop
 * - closure, IIFE
 * - string.prototype, array.prototype
 * - module pattern, classical inheritance
 * - singlton
 * - memoization
 * - throttle & debounce
 * - MVC - BB & Thorax
 *
 *
 * JS theory
 * - hoisting
 * - closure, scope, this, call&apply, prototype chain
 * - memory leaks & Garbage collection
 * - event bubbling & capture
 * - Ajax/Json vs. Jsonp & Promise
 * - DOM & window host obj
 * - Performance (caching, image loading, localstorage)
 * - jQuery, BB and underscore in&out
 * - RegExp
 *
 *
 * UI
 * - go thru the Bootstrap components on how html/css/js is structured- e.g.flyout,dropdown, modal, typeahead, form
 * - calendar widget
 * - Picture puzzle game w css position
 * - http://googlewebmastercentral.blogspot.com/2014/02/infinite-scroll-search-friendly.html
 * */

define(["jquery"], function ($) {
  /*
  * Hoisting
  * -------------
  * - varialbe only hoist declarion not assignment
  * */
  // varialbe only hoist declar
  console.log(a); //= undefined
  var a = 1;


  /*
   * @ How browser works (Reflow, Repaint)
   * ----------------------------------
   * http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
   *
   * - 1 Parsing HTML tag -> DOM tree (Nodes: Document, Element, Text)
   * - 2 Parsing CSS Style Parsing -> Style tree (Blocking)
   * - 3 Construct Render tree - based on 1,2, boxModel (has visual part of DOM tree and add text node, head/script/display:none will not in render tree)
   * - Reflow and Repaint on browser
   *
   * 1 Reflow (layout - calculate geometry change )
   * Attribute will trigger browser Reflow
   * -- DOM update/add/remove
   * -- CSS style and class change/add, font-size change
   * -- Resizing/scroll winodw event
   * -- .offsetHeight/width, .clentHeight/width, .scrollTop request
   * -- text change in input box
   * -- display: none (reflow+repaint) visibility: hidden (repaint)
   *
   * 2 Repaint (update screen)
   * Attribute will trigger browser Repaint
   * -- outline, background, color
   * -- visibility
   *
   * @@ Minimize Reflow & Repaint
   * - batch changes to dom, style, offline dom manipulation w documentFragment, cache dom ref
   * - avoid inline styles, use class
   * - apply animation to elements that position fixed/absolute
   * - use css hardware accelerating for animation
   *
   */

  /*
   * Garbage Collection(GC) & Memory Leak
   * -------------
   * http://buildnewgames.com/garbage-collector-friendly-code/
   *
   * JS virtual machine periodically auto clean up memory (GC-Garbage collector). it can take from 10ms -2000ms to cleanup depends on how many objects is created
   *
   * Memory leak friendly code:
   * - 1 don't keep reference to the objects u'r not using, use var in scope and avoid use/pollute global scope (which GC will think is active).  An object is considered garbage-collectable if there is zero reference pointing at this object.
   * - 2 delete/clear variable explictly w null when variable is not used
   * - 3 Avoid creating unnecessary objects, more object means GC need more time to process. Very var a=[],b={}, funciton c(){} will create object, array.slice(1) will return a new array obj, try to use linked-list if it's array.slice() heavy work; when lots object creation is needed. e.g. bullet class, use Object Pooling -create a pool array of objects on start var bulletPool=[],activeBullets=[], then getNewBullet() to push obj from bulletPool to activeBullets, so no need to create new obj, always use exist obj and get by factory function
   * - 4 Chrome window.performance.memory.usedJSHeapSize to check used heap memory
   * */

   function test() {
    var a = "test"; // variable declared in scope will be freed when function gone out of its scope
    b = a; //Bad- variable without var refer to global scope, GC will ignore free ref to global scope (since it never run out of global scope)
    var s = {data: "test"};
    s = null; //clear referernce to null so GC knows it's not required and can be freed
  }
  test();

  // Circular reference and closure
  function addHandler() {
    var el = document.getElementById('el');
    el.onclick = function() { //el created a circular reference between dom object el and js object (anonymous handle function with el as context)
      this.style.backgroundColor = 'red';
    };
  }


});

