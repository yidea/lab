require(["config"], function () {
  // Entry-point
  require(["jquery", "backbone", "bootstrap"], function ($, Backbone) {
    $(function () {
      //TODO: backbone view, data-spy
      var $root = $(".yidea"),
        $sidebar = $root.find(".sidebar"),
        $footer = $root.find(".footer"),
        offsetPageHeader = 100;

      $root.find(".page").each(function () {
        var $this = $(this);
        $this.find(".page-header").affix({
          offset: {
            top: $this.offset().top,
            bottom: $footer.outerHeight(true)
          }
        });
      });

      $("body").scrollspy({
        target: ".sidebar",
        offset: offsetPageHeader
      });

      // animate click sidebar to position
      $sidebar.find("a").on("click", function (ev) {
        ev.preventDefault();
        
        var offsetTop = $(this.hash).offset().top + offsetPageHeader;
        $("body").animate({scrollTop: offsetTop}, 500);
      });
    });
  });
});
