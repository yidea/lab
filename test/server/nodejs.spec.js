// to run: mocha test/server/nodejs.spec.js

var chai = require("chai"),
  sinonChai = require("sinon-chai");
global.expect = chai.expect;
global.sinon = require("sinon");
chai.use(sinonChai);

describe("test example ", function () {
  it("should work", function(){
    // example
    var a = 1;
    expect(a).to.be.ok;
  });
});
