define(["jquery", "underscore", "src/util"], function ($, _, u) {
  describe("$.Util", function () {
    describe("@string", function () {

      beforeEach(function () {
        //Create Spies & Stub
        this.windowStub = {
          location: {
            search: "?query=ipad%20mini"
          }
        };
        this.stubGetWindow = sinon.stub(u.string, "_getWindow").returns(this.windowStub);
      });

      afterEach(function () {
        // Clear
        this.windowStub = null;
        // Restore Spies & Stubs
        this.stubGetWindow.restore();
      });

      describe("parseUrl", function () {
        it("should work correclty w absolute url", function(){
          // given
          var url = "http://dev.walmart.com:8080/search/?query=ipad%20mini%20charger#top";
          // when
          var parser = u.string.parseUrl(url);
          // then
          expect(parser.protocol).to.equal("http:");
          expect(parser.hostname).to.equal("dev.walmart.com");
          expect(parser.port).to.equal("8080");
          expect(parser.pathname).to.equal("/search/");
          expect(parser.search).to.equal("?query=ipad%20mini%20charger");
          expect(parser.hash).to.equal("#top");
        });

        it("should work correclty w relative url", function(){
          // given
          var url = "/search/?query=ipad%20mini%20charger";
          // when
          var parser = u.string.parseUrl(url);
          // then
          expect(parser.search).to.equal("?query=ipad%20mini%20charger");
        });

        it("should work correclty w partial url ?param=1", function(){
          // given
          var url = "?query=ipad%20mini%20charger";
          // when
          var parser = u.string.parseUrl(url);
          // then
          expect(parser.search).to.equal("?query=ipad%20mini%20charger");
        });
      });

      describe("getQueryParamByName", function () {
        it("should work correcly by default when param url not set", function(){
          // then
          expect(u.string.getQueryParamByName("query")).to.equal("ipad mini");
          expect(u.string.getQueryParamByName("query2")).to.equal("");
        });

        it("should work correcly by default when param url is set", function(){
          // then
          expect(u.string.getQueryParamByName("query", "/search/?query=ipad%203")).to.equal("ipad 3");
          expect(u.string.getQueryParamByName("query2", "?query=ipad%203")).to.equal("");
        });
      });

    });
  });
});
