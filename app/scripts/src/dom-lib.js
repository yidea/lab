(function () {
  // Browser Host objects

  // DOM - document
  // -------------
  // JS I/O operation - expensive

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


  // Window
  // -------------
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
  * - schedule run fn after given delay,
  * - this = window
  * - Async/Non-block I/O: callback order is no gurantted as execution order which is depend on callback return time, so js is greate for heavy I/O system
  * - http://ejohn.org/blog/how-javascript-timers-work/
  * - http://www.brianweidenbaum.com/javascripts-settimeout-scheduled/
  *
  * - setTimeout(fn, 0)
  * -- Browser has 1 single UI thread (process of JS and UI update-paint/redraw/reflow) - register async callback and event queue to non-block I/O. so UI cannot render while js is running, since responsive ui<100ms, so suggeted to break long time(>100ms) js to chunk around 5ms run-time w setTimeout. Every JavaScript execution and UI update tasks will be added to a browser event queue system, which dispatches those tasks to the browser main UI Thread. When you generate new UI updates while the UI thread is busy, maybe is doing something like performing JavaScript, then those UI updates will be pushed into the UI queue system that is responsible for dispatch the tasks to the UI thread when it is idle. setTimeout(fn, 0) requeue the fn aync at the end of current execution queue so let the current long js process to finish and the affected UI to get updated. e.g. $("#test").typeahead()..big chunk of code.. instead directly ui update, $("test").focus(),give it a setTimout(fn, 0) to make sure UI is ready and js init is done.
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
      console.log("f1"); //TODO:debug
    }, 0);
    //  clearTimeout(timeId); // cancel schedule
  };
  var f2 = function () {console.log("f2");};
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



  
})();
