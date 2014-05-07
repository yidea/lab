define(["jquery"], function () {
  /*
   * TOC
   * -------------
   *  DOM Scripting
   *  Window host object
   *  Date
   *  Events Handling & Touch
   *  Client Storage
   *  Graphics
   * */

  /*
   * @ DOM Scripting
   * ------------------------------
   * - DOM I/O operation - expensive
   * - $(document) refer to html,  $(window) - refer to browser e.g. $(window).width has scrollbar width
   * - $(document).ready vs $(window).onload
   * */
  /* Nodelist (window host dom object)
   * - live collecton of node
   * - arraylike, but don't have array method forEach, map, filter
   * - loop with for or cover to array to use forEach
   * http://duruk.net/nodelists-and-arrays-in-javascript/
   * */

  // $(".test")
  var testList1 = document.querySelectorAll(".test"); //general css xpath
  var testList2 = document.getElementsByClassName("test"); //faster
  // document.getElementById(idname); document.getElementsByTagName(tagname);

  /* Node
  * - NodeType: { ELEMENT_NODE=1, ATTRIBUTE_NODE=2, TEXT_NODE=3}
  * */
  // $(".test").get(0)
  var testLink1 = document.querySelector(".test"); //return first match

  //@ DOM manipulation
  // $(".zone1").append("<div id='div1'><img src='im.gif'/></div>")
  // testLink1.innerHTML = "<div id='div1'><img src='im.gif'/></div>" //jquery uses native innerHTML
  //DOM building tech
  var frag = document.createDocumentFragment();
  var div1 = document.createElement("div");
  div1.id = "div1";
  var img1 = document.createElement("img");
  img1.src = "im.gif";
  img1.setAttribute("alt", "test"); // or img1.alt= ".."
  //var div1.getAttribute("tabindex");
  div1.appendChild(img1);
  frag.appendChild(div1);
  var zone1 = document.querySelector("#zone1");
  zone1.appendChild(frag); //insertBefore(), removeChild()

  //@ CSS class
  // $(".test").hasClass("test")
  if (testLink1.classList.contains("test")) {}
  
  // $(".test").addClass("test-link")
  testLink1.classList.add("test-link"); //only apply to node ,not nodeList

  // $(".test").removeClass("test-link")
  testLink1.classList.remove("test-link");

  //@ CSS style
  // $(".test").css({background: "#ccc"})
  testLink1.style.background = "#ccc";

  /*
   * @ Window host object
   * ----------------------------
   */

  /*
   * @@ window/viewport/element coordinate
   * ----------------------------------
   * - window.innerHeight; (viewport)
   * - http://jsbin.com/vocij
   */

  /*
   * @@ window events
   * DOMContentLoaded
   * load
   * beforeunload
   * unload
   * ----------------------------------
   */
  window.addEventListener("DOMContentLoaded", function () { //IE9+
//    console.log("fired when DOM tree parsed and loaded");
  });
  // polyfill for DOMContentLoaded on IE w onreadystatechange
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {} //init
  };

  window.addEventListener("load", function () {
//    console.log("fired when Resources are all loaded");
  });
  window.addEventListener("beforeunload", function () {
//    console.log("fired when the document and resources is about to be unloaded"); //location.href redirect
  });
  window.addEventListener("unload", function () {
//    console.log("fired when the document and resources is being unloaded");
  });

  /*
  * @@ window.onerror()
  * - log console error msg to server with firing a img.src url request
  * http://blog.debug.cz/2012/04/using-windowonerror-handler-for-logging.html
  * */
  window.onerror = function (errorMsg, url, line) {
    console.log(errorMsg, url, line); //log error message and line#, can fire ajax to report the client error to a center place
  };

  /*
  * setInterval(fn, delay)
  * - schedule repeatly run fn every delay ms. When you set a timeout, it actually queues the asynchronous code until the engine executes the current call stack.
  * - this = window
  * - the delay time e.g. 100ms is not guranteed, depends on real running time, could be run the next one after 200ms if 1st one take 200ms to run, the fn is queued
  * - 1000ms = 1s
  * */
  var intervalId = setInterval(function () {
    console.log("setInterval"); //TODO:debug
  }, 100);
  clearInterval(intervalId); // cancel schedule

  /*
  * setTimeout(fn, delay)
  * - schedule run fn after given delay
  * - this = window
  * - Async/Non-block I/O: callback order is no gurantted as execution order which is depend on callback return time, so js is greate for heavy I/O system
  * - http://ejohn.org/blog/how-javascript-timers-work/
  * - http://www.brianweidenbaum.com/javascripts-settimeout-scheduled/
  *
  * - setTimeout(fn, 0)/ _.defer(fn)
  * -- setTimeout(fn, 0) buys you some time until the DOM elements are loaded (and rendering is complete), even if it’s set to 0 (run this fn code in next run loop)
  * -- This can be handy with the DOM. Sometimes you run a js, but the js which update the dom(e.g. typeahead init) don't parse or render immediately. At the end of the run loop, the browser gets back the UI thread control and parses and renders the DOM, then the next run loop starts and can interact with the newly rendered DOM w setTimout(fn, 0)
  * -- Browser has 1 single UI thread (process of JS and UI update-paint/redraw/reflow) - register async callback and event queue to non-block I/O. so UI cannot render while js is running, since responsive ui<100ms, and smooth animation w 60 frames/s need js done in 16ms, so suggeted to break long time(>100ms) js to chunk around 5ms run-time w setTimeout. Every JavaScript execution and UI update tasks will be added to a browser event queue system, which dispatches those tasks to the browser main UI Thread. When you generate new UI updates while the UI thread is busy, maybe is doing something like performing JavaScript, then those UI updates will be pushed into the UI queue system that is responsible for dispatch the tasks to the UI thread when it is idle. setTimeout(fn, 0) requeue the fn aync at the end of current execution queue so let the current long js process to finish and the affected UI to get updated. e.g. $("#test").typeahead()..big chunk of code.. instead directly ui update, $("test").focus(),give it a setTimout(fn, 0) to make sure UI is ready and js init is done.
  * -- Event Queue:
    var taskQueues = {
     domEventsQueue: {1ms: clickedButton},
     callbacksQueue: {3ms: runSomeFunction, 5ms: processDataFromServer}
    };
  * SetTimeout is just adding a new entry to a queue which cannot be accessed until later when current task is done and looking for new task in the queue.
  * -- = setTimeout(fn, 4), since modern browser clamp timer to minimal 4ms
  * */
  var f1 = function () {
    var timeId = setTimeout(function () {
//      console.log("f1"); //TODO:debug
    }, 0);
    //  clearTimeout(timeId); // cancel schedule
  };
  var f2 = function() {};
  f1();
  f2(); //output as f2, f1 because setTimeout(fn, 0) is actually setTimeout(fn, 4), so it's aync callback

  /*
   * setImmediate(fn)
   * - dose what setTimeout(fn, 0) is about to do, in a native & better way
   * - tell browser to execute fn after the last UI task in the event loop
   * - but not supported in IE10- and Mozilla, Webkit, so not very useful
   * */


  /*
  * requestAnimationFrame()
  * - schedule a new paint task in the event loop queue
  * */

  /*
   * @ matchMedia
   * ----------------------------------
   * - work with css media query IE10+
   * - Codepen: http://codepen.io/yidea/pen/pAxhi/
   */

  /*
   * @ Date object
   * ----------------------------------
   * http://jsbin.com/nipaz
   */

  /*
   * @ Events Handling & Touch
   * ----------------------------------
   * http://coding.smashingmagazine.com/2013/11/12/an-introduction-to-dom-events/
   *
   * - event object
   * - Event bubbling & delagtion
   * - Keyboard Event
   * - Mouse event
   * - Touch Event & 300ms delay (wait for 2nd tap)
   * */

  /*
   * @@ Event object & e.currentTarget vs e.target(jquery)
   * ----------------------------------
   * e.currentTarget vs e.target is cauulsed by Event Bubbling, e.g.  a > img
   * http://blog.bittersweetryan.com/2013/04/a-quick-look-at-etarget-and.html
   * - e.currentTarget - the element that has the event handler attahced $("a").on("click", function(){})
   * - e.target - the element trigger the event, it will be the child img, it will bubble up to curentTarget
   */

  /* @@ Event Capture & Bubbling, Delagtion
   * - Event listener
   * element.addEventListener(<event-name>, <callback>, <use-capture>);
   * element.removeEventListener(<event-name>, <callback>, <use-capture>);
   * Everytime u listen for event, u make a choice which phase you want to listen for your event, jQuery and most case listen on bubble phase
   * clickButton.addEventListener('click', eventHandler, false); //listen event at bubble phase, so child fire first, then parent
   *
   * - Event 3 phases: user click <button>
   *   1 Capture phase: event capture start from window -> doc -> .. button, then call the event handler (item.addEventListener("click", doSomething, true)); IE9+ support parent fire first if has listener, not ideal
   *   2 Target phase: fire event on element, run the eventlistener
   *   3 Bubble/propagation phase: event bubble start from button -> doc -> window, child fire first then parent, jQuery is listen on this phase, prevent bubble w ev.stopPropagation
   * clickButton.addEventListener('click', eventHandler, false);
   *
   * - Delegate Event listener
   * More performant way to listen for events on large number of DOM nodes, dynamic using one parent level event listener, e.gl listener about ul, use ev.target to detect child element
   * $('ul').on('click', 'li', function(){});
   * */

  // Event object
  $("a").on("click", function (ev) {
    //this refers to the element that fire the event
    var target = ev.target; //element that where the event originated,  -> this
    //ev.currentTarget; //element that the event callback is currently firing on
    ev.preventDefault(); //prevent the element default browser function (goto another page or form submit)
    ev.stopPropagation(); //allow default function but prevent event bubble up to parent dom
    ev.stopImmediatePropagation(); //prevent other eventhandler run on current element
  });


  /*
  * @@ Keyboard Event
  * http://www.kirupa.com/html5/keyboard_events_in_javascript.htm
  * - playground: http://codepen.io/yidea/pen/mgBjE
  *
  * - keydown listener instead of keypress, use it on document instead of winodow (IE8 doesn't support keydown on window)
  * if displayable key (letter/number): keydown -> keypress -> keyup  (keypress will on fire for displayable key, behave like a characterkeypress)
  * if nodisplayable key (arrow, sapacebar, function): keydown -> keyup
  * keydown,keyup are bubbling events
  *
  * - use ev.which: ev.which vs. ev.keyCode
  *  if using jQuery.on(), always use e.which, since e.keyCode is not compatable, in pc/browsers CMD keyCode is different , e.which will normalize it by jquery
  * */
  window.addEventListener("keydown", dealWithKeyboard, false);
  // Single key
  function dealWithKeyboard(ev) {
   switch (ev.keyCode) {
     case 38: //37-40 arrow key
       //up arrow: do sth,
   }
  }

  /* @@ Mouse Event
   http://www.mkyong.com/jquery/different-between-mouseover-and-mouseenter-in-jquery/
  * - mouseenter/leave (event don't bubble up, only fire once no matter the listener has child/ or not)- hover effect
  * - mouseover/out (event will bubble up, same as mouseenter/leave if listener element has no child element; if has child element will fire n times based on the n inner nested element)
  * */


  /*
   * @ Client Storage
   * ----------------------------------
   * - Cookie
   * - Localstorage
   * Only accept string, so need Json.stringify for objects, limit size 5MB
   * http://hacks.mozilla.org/2009/06/localstorage/
   *
   */


});
