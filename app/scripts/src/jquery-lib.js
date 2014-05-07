
//@ $(".test").data("cat-id") is not reliable use .attr("data-cat-id") to get html data-attribute
//if u have <button data-cat-id="">click</button>
//$.data() will only check the the html data-attribute for the 1st time, then it will store data to the dom $.data() (not visible in html), so .data() will not look at the html data-attribute for value but will look at the $.data(), so use .attr() to read/write to html data-attribute consistantly


/*
 * @ Event
 * ----------------------------------
 * -
 */
// Event delegation
//$category.find(".category-main").on("click", "a:not(.paginator-btn)", this.onLinkAction); //exclude a.paginator-btn
//$category.find(".category-main").on("click", "a[href]", this.onLinkAction); // exclude a without href attr

/*
 * @ Dom
 * ----------------------------------
 * -
 */
//@@ Dom structure check
if($("a").length) {} // check dom element exist, validate this before running any logic
if ($("#div1").find("img").length) {} //check if element has img
var $divs = $("div:not(.text)"); //exclude div.text

//@@ Get HTML attributes
// id, class
var id = $("div").attr("id");
var className = $("div").attr("class"); // class is reserved, cannot be var name
var hasClass = $("div").hasClass("js-test");

// data-*
var data = $("div").attr("data-item-id"); //.attr() will read/write on html
var data2 = $("div").data("item-id"); //.data() will only read from html for the first time, rest will read/write to $jq object in memory, write will not reflected on html attribute

// <img>: alt, title, src
var alt = $("img").attr("alt");
$("img").attr("src", "test.gif");

// <a>: href, target, text, search(?q=ipad)
var href = $("a").attr("href"); //use .attr() to get string value. but beaware the href is not encoded with %20
var href2 = $("a").get(0).href; // $("a")[0].href; //html href encoded
$("a").attr("target", "_blank"); //set
var text = $("a").text(); //can only apply to non-form html element, .text(content) will

//@@ Form element: prop, value
//- Checkbox
var $checkbox = (":checkbox"); //$("input[type='checkbox']")
$checkbox.on("change", function () { //checkbox change
  var $this = $(this);
  $this.prop("checked", !$this.is(":checked"));
});
$("input[type='checkbox']").prop("disabled", true); //set

//- Text
var value = $("textarea").val(); // value="", cann't use .text() on form element
