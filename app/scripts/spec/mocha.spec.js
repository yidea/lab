define(["jquery", "src/underscore-lib"], function ($, u) {

  describe('Parent', function () {

    beforeEach(function () {
      //Create HTML fixture
      this.fixtureId = "#fixtures";
      this.$fixture = $([
        "<ul class=\"js-lhn-menu lhn-menu block-list\">",
        "  <li>",
        "    <a href=\"\/search\/?cat_id=5438_1104814\" class=\"lhn-menu-toggle\">Boy<\/a>",
        "  <\/li>",
        "<\/ul>"
      ].join("")).appendTo($(this.fixtureId));

      // Cache DOM elements
      this.$el = this.$fixture;
      this.$flyout = this.$el.find(".js-flyout");
      this.$flyoutToggle = this.$flyout.find(".js-flyout-toggle");

      //Create Spies & Stub
      this.windowStub = {
        location: ""
      };
      this.stubGetWindow = sinon.stub(LhnMenu.prototype, "_getWindow").returns(this.windowStub);
      this.spyInitMenuAim = sinon.spy(LhnMenu.prototype, "_initMenuAim");
//      sinon.stub(touchUtils, "isTouch").returns(false);

      //Init BB view
//      this.lhnMenuView = new LhnMenu({el: this.$el});
    });

    afterEach(function () {
      // Remove HTML fixture
      this.$fixture.remove();

      // Restore Spies & Stubs
      this.windowStub = null;
      this.spyInitMenuAim.restore();
      this.stubGetWindow.restore();
//      touchUtils.isTouch.restore();

      // Restore BB view
//      this.lhnMenuView.remove();
    });

    it("should init component and UI correctly", function(){
      // components
//      expect(this.lhnMenuView)
//        .to.be.ok.and
//        .to.be.an.instanceof(LhnMenu);
//      expect(this.spyInitMenuAim).to.be.calledOnce;

      // UI
      expect(this.$flyoutToggle)
        .to.have.$attr("data-cat-id", "0").and
        .to.have.$attr("data-cat-name", "All Departments").and
        .to.have.$text("All");
      expect(this.$flyout).to.not.have.$class("active");
    });

    it("should show content on click", function(){
      // given
      // when
      // then
//      expect(this.stubLoadFullPage)
//        .to.be.calledOnce.and
//        .to.be.calledWith("/search/?query=ipad&cat_id=2636&typeahead=ipa");
    });

  });

});
