require(["config"], function () {
  // Entry-point
  require(["jquery", "backbone", "bootstrap", "jquery.powerpack"], function ($, Backbone) {
    $(function () {
      var $window = $(window),
        $body = $("body");

      // sidebar
      var $sections = $(".row").find("section"),
        $lis = $();

      $sections.each(function () {
        var $this = $(this),
          $h1s = $this.find(".page-header"),
          $h2s = $this.find("h2"),
          $li = $("<li>");

        $h1s.each(function () {
          var $a = $("<a>")
            .attr("href", "#" + this.id)
            .text(this.innerHTML)
            .appendTo($li);
        });

        if ($h2s.length) {
          var $innerUl = $("<ul>", {class: "nav"}),
            $innerLis = $();
          $h2s.each(function () {
            var $innerLi = $("<li>"),
              $a = $("<a>")
                .attr("href", "#" + this.id)
                .text(this.innerHTML)
                .appendTo($innerLi);
            $a.appendTo($innerLi);
            $innerLis = $innerLis.add($innerLi);
          });

          $innerLis.appendTo($innerUl);
          $innerUl.appendTo($li);
        }

        $lis = $lis.add($li);
      });

      // affix & scrollspy
      $(".js-affix").find(".nav").append($lis);
      $body.scrollspy({target: ".js-affix"});
      setTimeout(function () {
        $(".js-affix").affix({
          offset:{top: 100}
        });
      }, 100);

      $window.on("load", function () {
        $body.scrollspy("refresh");
      });

      // lazyload iframe
      var $iframes = $("iframe[data-src]");

      $iframes.each(function (index) {
        var $iframe = $(this);

        //show
        $iframe.one("show", function () {
          // load iframe: change data-src to src, after loaded remove item from $iframes
          $iframe
            .on("load", function () {
              //remove data-src
              $iframe.removeAttr("data-src");
              $iframes = $iframes.filter(function () {
                return $(this).attr("data-src");
              });

              if ($iframes.length === 0) {
                $window.off("scroll");
              }

            })
            .attr("src", $iframe.attr("data-src"));
        });
      });

      //resize
      $window.on("scroll", _processScroll);

      function _processScroll() {
        //iterate iframes, load if iframe scrolled into view by change src
        $iframes.each(function () {
          var $iframe = $(this);
          if ($iframe.isInViewport()) {
            $iframe.trigger("show");
          }
        });
      }

      _processScroll(); //init page load

    });
  });
});
