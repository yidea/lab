/*
 * @ Web Performance
 * ----------------------------------
 * - Reading
 * http://www.bookofspeed.com/
 * http://developer.nokia.com/community/wiki/JavaScript_Performance_Best_Practices
 * http://dev.opera.com/articles/view/efficient-javascript/?page=3#reflow
 *
 * - General Rule:
 * Less HTTP request #, Small HTTP response size(minify), Address js blocking issue(js to bottom,Async), Maxmise Cache/reuse (cookie, localstorage, timeout), Less Repaint&Reflow(batch changes)
 *
 * - How browser works
 * User enter url, browser send http request to server for html via DNS lookup if not stored, after get response, browser html parsing trigger resource http requests (js download will block the parse, css/img download will be async 6 max). Average page send 90 http request
 *
 * - Browser Single UI Thread & UI Queue
 * http://www.slideshare.net/nzakas/javascript-timers-power-consumption-and-performance
 * 1 Execute JS (e.g. event handler onclick)
 * 2 UI update parse/repaint/render (No UI update will happend while js is executing), can use _.defer()/setTimeout(0) to add to UI queue later to make sure previous js update the UI
 *
 * - Perceived Performance
 * UX to help adjust perception >100ms(loading bar, reading sth)
 * 80/20 rule, consider the 80% of user common behavior not the 20% corner cases
 */

/*
 * @ HTML
 * ----------------------------------
 * - On-demand load (Ajax, load css/js)
 * - Predictive fetch JS/CSS (On-demand drawbacks is response time > 100ms, we can fetch secondary content js/css after page load.eg. tab at bottom )
 * - Ajax (using json instead of html to saving bytes)
 * - cache template in localstorage
 * - Clean uneccessary HTML element, less nesting
 * - Server: Gzip html, Page Flushing on server template (flush header then main seciton, last footer)
 */

/*
 * @ JS
 * ----------------------------------
 * - AMD modular aync load js, callback on dom ready to interact
 * - Concat & minify JS
 * - Ensure it's at botom so it dones't block page rendering
 * - Lazy load JS (Only load the user interaction needed)
 * - Minmize/batch DOM operation(minimise Page reflow & repaint)- batch dom(DocumentFragment)/style update (avoid inline style, use class) will trigger reflow, display: none content then do the offline style update then display:block back
 * - Code create less function/object, use prototype inheritance to share method
 * - profiling & window.performance
 * - pajx + pushstate
 * - Event deligation
 * - $.remove(), html() and empty() have order of n2 time complexity, that is T(n) = O(n2). Minimizing the use of these methods is recommended
 */
//batch dom
var tmpl = "<li><button>1</button></li>",
  $items = $();
for (var i =0; i <4; i++) {
  $items = $items.add(tmpl);
}
$(".test").append($items);


/*
 * @ CSS
 * ----------------------------------
 * - remove unused, minify
 * http://addyosmani.com/blog/removing-unused-css/
 * - make CSS programable w preprocess framework Sass/Stylus
 * - css at top, avoid @import
 * - use GPU for certain aninmation. e.g. use transform for animation, -webkit-transform:translate3d(0,0,0) !important;
 *
 */

/*
 * @ Resources (img/css/js)
 * ----------------------------------
 * - use CDN for static resources (AWS/Akamai)
 * - iconfont/css sprite
 * - image compress, image server
 * - lazy loading on viewport
 * - browser cache static image
 * - cache css/js in localstorage (Bing)
 */

