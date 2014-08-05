require(["config"], function () {
  // Entry-point
  require(["jquery", "underscore"], function ($, _) {

    //https://github.com/marcojakob/online-book-20thingsilearned/blob/master/war/js/twentythings.pageflip.js
    $(function () {
      var BOOK_WIDTH = 830,
        BOOK_HEIGHT = 260,
        PAGE_WIDTH = 400,
        PAGE_HEIGHT = 250,
        CANVAS_PADDING = 60,
        PAGE_Y = (BOOK_HEIGHT - PAGE_HEIGHT) / 2;

      var $book = $("#book"),
        book = $book.get(0),
        $pages = $book.find("section"),
        $canvas = $book.find("#pageflip-canvas"),
        canvas = $canvas.get(0),
        context = canvas.getContext("2d"),
        flips = [],
        mouse = {x: 0, y: 0}, //updated on mouse move
        page = 0; //current page#

      // organize page depth by zIndex 1-N (first page on top=len)
      var pagesLen = $pages.length;
      $pages.each(function (index) {
        $(this).css("zIndex", pagesLen - index);
        
        // create flip obj for each page - progress/target is used for determine fold direction: -1(left) 0 1(right)   
        flips.push({
          // current progress of flip: -1(left) 0 1(right)
          progress: 1,
          // target which progress is moving towards(right)
          target: 1,
          // clip owner page
          page: this,
          // true while page is being dragged
          dragging: false
        });
      });

      // setup canvas
      canvas.width = BOOK_WIDTH + (CANVAS_PADDING * 2);
      canvas.height = BOOK_HEIGHT + (CANVAS_PADDING * 2);
      canvas.style.top = -CANVAS_PADDING + "px";
      canvas.style.left = -CANVAS_PADDING + "px";
      
      // register event listener to user mouse event to determine flip interactive
      // todo: Touch? debouce or throttle?, requestAnimationFrame()
      $book.on("mousemove", _onMousemove);
      $book.on("mousedown", _onMousedown);
      $book.on("mouseup", _onMouseup);

      // render flip folding canvas 30 frame/s
      setInterval(_render, 1000 / 30);

      // render folding flip onto canvas
      function _render() {
        // reset all pixel in canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // set all flips progress and draw active flip
        _.each(flips, function (flip) {
          if (flip.dragging) {
            flip.target = Math.max(Math.min(mouse.x/PAGE_WIDTH, 1), -1);
          }
          // ease progress toward target
          flip.progress += (flip.target - flip.progress) * 0.2;
          // trigger the draw flip when active flip get the intention
          if (flip.dragging || Math.abs(flip.progress) < 0.997) {
            _drawFlip(flip);
          }
        });
      }

      function _drawFlip(flip) {
        // strength of the fold (strongest in middle)
        var strength = 1 - Math.abs(flip.progress);
        // width of fold flip
        var foldWidth = (PAGE_WIDTH / 2) * (1 - flip.progress);
        // X position of fold flip
        var foldX = PAGE_WIDTH * flip.progress + foldWidth;
        // fold flip vertical outdent due to perspective
        var verticalOutdent = 20 * strength;
        // shadow width
        var paperShadowWidth = (PAGE_WIDTH / 2) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
        var rightShadowWidth = (PAGE_WIDTH / 2) * Math.max(Math.min(strength, 0.5), 0);
        var leftShadowWidth = (PAGE_WIDTH / 2) * Math.max(Math.min(strength, 0.5), 0);

        // change page width to match X position of fold flip
        flip.page.style.width = Math.max(foldX, 0) + "px";
        context.save();
        context.translate(CANVAS_PADDING + (BOOK_WIDTH / 2), CANVAS_PADDING + PAGE_Y);

        // draw show on left side
        context.strokeStyle = "rgba(0, 0, 0," + (strength * 0.05) + ")";
        context.lineWidth = strength * 30;
        context.beginPath();
        context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT + (verticalOutdent * 0.5));
        context.stroke();

        // right side drop shadow
        var rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
        rightShadowGradient.addColorStop(0, "rgba(0, 0 ,0, " + (strength * 0.2) + ")");
        rightShadowGradient.addColorStop(0.8, "rgba(0 , 0, 0, 0)");
        context.fillStyle = rightShadowGradient;
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX + rightShadowWidth, 0);
        context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.fill();

        // left side drop shadow
        var leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
        leftShadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        leftShadowGradient.addColorStop(1, "rgba(0, 0, 0, " + (strength * 0.15) + ")");
        context.fillStyle = leftShadowGradient;
        context.beginPath();
        context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
        context.lineTo(foldX - foldWidth, 0);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
        context.lineTo(foldX - foldWidth - leftShadowWidth,  PAGE_HEIGHT);
        context.fill();

        // draw curved folder flip w gradient(highlight + shadow)
        var foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
        foldGradient.addColorStop(0.35, "#fafafa");
        foldGradient.addColorStop(0.73, "#eee");
        foldGradient.addColorStop(0.9, "#fafafa");
        foldGradient.addColorStop(1, "#e2e2e2");
        context.fillStyle = foldGradient;
        context.strokeStyle = "rgba(0, 0, 0, 0.86)";
        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.quadraticCurveTo(foldX, PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
        context.lineTo(foldX - foldWidth, -verticalOutdent);
        context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
        context.fill();
        context.stroke();

        context.restore();
      }

      function _onMousemove(ev) {
        // record mouse position and user intention
        mouse.x = ev.clientX - book.offsetLeft - (BOOK_WIDTH/2);
        mouse.y = ev.clientY - book.offsetTop;
      }
      
      function _onMousedown(ev) {
        ev.preventDefault(); //prevent mousedown text selection

        // if mousedown inside the book, find the prev/next intention and matching flip to dragging active
        if (mouse.x < 0 && page > 0) { //on left side& not firstpage, drag previous page flip
          flips[page - 1].dragging = true;
        } else if (mouse.x > 0 && page < pagesLen) { //on right side & not lastpage, drag current page flip
          flips[page].dragging = true;
        }
      }

      function _onMouseup() {
        // trigger the dragging active flip animation to destination, then reset inactive
        // TODO: avoid loop, set a activeFlip ref?
        _.each(flips, function (flip) {
          if (flip.dragging) {
            if (mouse.x <= 0) { //animate flip to left -1, next page
              flip.target = -1;
              page = Math.min(page + 1, pagesLen);
            } else { //animate flip to right 1, prev page
              flip.target = 1;
              page = Math.max(page - 1, 0);
            }
            flip.dragging = false;
          }
        });
      }

    });
  });
});
