/*
* Specs - underscore-lib
*
* grunt test
* localhost:9001
* http://chaijs.com/api/bdd/
*/
define(["scripts/src/underscore-lib.js"], function () {
  describe("Util", function () {
    // Setup
    var u = window.Util,
      collection,
      divs = document.querySelectorAll("div"),
      div = document.querySelector("div");

    describe("Collection", function () {
      describe(".each (collection, callback, context)", function () {
        it("should work w array[1, 2, 3]", function () {
          collection = [1, 2, 3];
          // when
          u.each(collection, function (value, index) {
            collection[index] = value + 1;
          });
          // then
          expect(collection).to.eql([2, 3, 4]);
        });
        it("should work w plain object {name: 'vinc', age: 12}", function () {
          var obj = {};
          collection = {name: "vinc", age: 12};
          // when
          u.each(collection, function (value, key) {
            obj[key] = value + 1;
          });
          // then
          expect(obj).to.eql({name: "vinc1", age: 13});
        });
        it("should work w htmlCollection object", function () {
          //when
          u.each(divs, function (node, index) {
            node.classList.add("test");
          });
          //then
          u.each(divs, function (node, index) {
            expect(node.classList.contains("test")).to.be.true;
          });
        });
        it("should exit when callback returns false", function(){
          collection = [1, 2, 3];
          var counter = 0;
          // when
          u.each(collection, function (value, index) {
            if (value === 1) {
              counter++;
              return false;
            }
          });
          // then
          expect(counter).to.equal(1);
        });
      });
      
      describe(".contains (obj, value)", function () {
        it("should return false when obj in invalid", function(){
          expect(u.contains(null, 1)).to.be.false;
          expect(u.contains(undefined, 1)).to.be.false;
        });
        it("should return true when obj is array and contains value", function(){
          expect(u.contains([1, 2], 1)).to.be.true;
        });
        it("should return false when obj is array and not contains value", function(){
          expect(u.contains([1, 2], 1)).to.be.true;
        });
        it("should return true when obj is object and contains value", function(){
          expect(u.contains({a: 1, b: 2}, 1)).to.be.true;
        });
        it("should return false when obj is object and not contains value", function(){
          expect(u.contains({a: 1, b: 2}, 3)).to.be.false;
        });
      });

      describe("Array", function () {
        describe(".union (*arrays)", function () {
          it("should return unioned and uniqued array", function(){
            // when
            var arr = u.union([1], [1, 2, 3], [1, 2]);
            // then
            expect(arr).to.eql([1, 2, 3]);
          });
        });
        describe(".nodelistToArray (obj)", function () {
          it("should return array when obj is Nodelist ", function(){
            // when
            var arr = u.nodelistToArray(divs);
            // then
            expect(Object.prototype.toString.call(divs)).to.equal("[object NodeList]");
            expect(arr).to.be.ok.and
              .to.be.an("array");
            expect(divs.length).to.equal(arr.length);
          });
          it("should return null when obj is not list", function(){
            // when
            var arr = u.nodelistToArray({a: 1, b:2});
            // then
            expect(arr).to.not.be.ok;
          });
        });
      });

      describe("Object", function () {
        describe(".has (obj, prop)", function () {
          var obj = {lastName: "Yi"};
          it("should return false when obj is null/undefined", function(){
            var a;
            expect(u.has(a, "lastName")).to.be.false;
            expect(u.has(null, "lastName")).to.be.false;
          });
          it("should return true when obj has direct prop ", function () {
            // then
            expect(u.has(obj, "lastName")).to.be.true;
          });
          it("should return false when obj has no direct prop ", function () {
            // when
            var obj = {lastName: "Yi"};
            // then
            expect(u.has(obj, "firstName")).to.be.false;
          });
        });
        
        describe(".some (obj, callback, context)", function () {
          it("should return false when obj not valid", function(){
            // when
            // then        
          });
          it("should return true when has item pass the test", function(){
            // when
            var result = u.some([1, 2, 3], function (value, key, list) {
              return value === 1;
            });
            // then
            expect(result).to.be.true;
            // when
            result = u.some({a: "1", b: 2, c: 3}, function (value, key, list) {
              return value === "1";
            });
            // then
            expect(result).to.be.true;
          });
          it("should return false when has no item pass the test", function(){
            // when
            // then
          });
        });
      });
    });
    
    describe("Type Check", function () {
      describe(".isUndefined (obj)", function () {
        it("should return true when obj undefined", function () {
          var a;
          expect(u.isUndefined(a)).to.be.true;
          expect(u.isUndefined()).to.be.true;
        });
        it("should return false when obj is defined", function () {
          expect(u.isUndefined("")).to.be.false;
          expect(u.isUndefined(1)).to.be.false;
          expect(u.isUndefined([])).to.be.false;
          expect(u.isUndefined({})).to.be.false;
          expect(u.isUndefined(function () {
          })).to.be.false;
        });
      });

      describe(".isNull (obj)", function () {
        it("should return true when obj is null", function () {
          expect(u.isNull(null)).to.be.true;
        });
        it("should return false when obj is not null", function () {
          expect(u.isNull()).to.be.false;
          expect(u.isNull(1)).to.be.false;
          expect(u.isNull("")).to.be.false;
          expect(u.isNull({})).to.be.false;
          expect(u.isNull([])).to.be.false;
          expect(u.isNull(function () {
          })).to.be.false;
        });
      });

      describe(".isString (obj), .isNumber, .isBoolean, .isFunction ..", function () {
        it("should work - isString", function () {
          expect(u.isString("")).to.be.true;
          expect(u.isString()).to.be.false;
          expect(u.isString(null)).to.be.false;
          expect(u.isString(1)).to.be.false;
          expect(u.isString([])).to.be.false;
          expect(u.isString({})).to.be.false;
          expect(u.isString(function () {
          })).to.be.false;
        });
        it("should work - isNumber", function () {
          expect(u.isNumber(12)).to.be.true;
          expect(u.isNumber(1.2)).to.be.true;
          expect(u.isNumber()).to.be.false;
          expect(u.isNumber(null)).to.be.false;
          expect(u.isNumber("")).to.be.false;
          expect(u.isNumber([])).to.be.false;
          expect(u.isNumber({})).to.be.false;
          expect(u.isNumber(function () {
          })).to.be.false;
        });
        it("should work - isBoolean", function () {
          expect(u.isBoolean(true)).to.be.true;
          expect(u.isBoolean(false)).to.be.true;
          expect(u.isBoolean()).to.be.false;
          expect(u.isBoolean(null)).to.be.false;
          expect(u.isBoolean("")).to.be.false;
          expect(u.isBoolean(1)).to.be.false;
          expect(u.isBoolean([])).to.be.false;
          expect(u.isBoolean({})).to.be.false;
          expect(u.isBoolean(function () {
          })).to.be.false;
        });
        it("should work - isFunction", function () {
          expect(u.isFunction(function () {
          })).to.be.true;
          expect(u.isFunction()).to.be.false;
          expect(u.isFunction(null)).to.be.false;
          expect(u.isFunction("")).to.be.false;
          expect(u.isFunction([])).to.be.false;
          expect(u.isFunction({})).to.be.false;
        });
      });

      describe(".isArray (obj)", function () {
        it("should return true when obj is array", function () {
          var arr = [1, 2];
          expect(u.isArray(arr)).to.be.true;
        });
        it("should return false when obj is not array", function () {
          expect(u.isArray()).to.be.false;
          expect(u.isArray(null)).to.be.false;
          expect(u.isArray(divs)).to.be.false;
          expect(u.isArray({})).to.be.false;
          expect(u.isArray(1)).to.be.false;
          expect(u.isArray(function () {
          })).to.be.false;
        });

//        describe("when no support Array.isArray(ECMAScript5) ", function () {
//          it("should return true when obj is array", function () {
//            var sandbox = sinon.sandbox.create();
//            sandbox.stub(Array, "isArray").returns(false);
//            var arr = [1, 2];
//            expect(u.isArray(arr)).to.be.true;
//            sandbox.restore();
//          });
//        });
      });

      describe(".isArrayLike (obj)", function () {
        it("should return true when obj is Array || Nodelist || jQueryObject", function () {
          expect(u.isArrayLike([1, 2])).to.be.true;
          expect(u.isArrayLike(divs)).to.be.true;
          expect(u.isArrayLike(div)).to.be.true;
        });
        it("should return false when obj is not ArrayLike", function () {
          expect(u.isArrayLike({name: "test"})).to.be.false;
          expect(u.isArrayLike(function () {
          })).to.be.false;
        });
      });

      describe(".isObject (obj)", function () {
        it("should return true when obj is object", function () {
          expect(u.isObject({age: 12})).to.be.true;
          expect(u.isObject({})).to.be.true;
        });
        it("should return false when obj is not object", function () {
          expect(u.isObject()).to.be.false;
          expect(u.isObject(divs)).to.be.false;
          expect(u.isObject([])).to.be.false;
          expect(u.isObject(function () {
          })).to.be.false;
        });
      });

      describe(".isNodeList (obj)", function () {
        it("should return true when obj is NodeList", function(){
          expect(u.isNodeList(divs)).to.be.true;
        });
        it("should return false when obj is not NodeList", function(){
          expect(u.isNodeList(div)).to.be.false;
          expect(u.isNodeList({})).to.be.false;
          expect(u.isNodeList([])).to.be.false;
        });
      });

      describe(".isDomElement (obj)", function () {
        it("should return true when obj is DOM element", function () {
          expect(u.isDomElement(div)).to.be.true;
        });
        it("should return false when obj is not DOM element", function () {
          expect(u.isDomElement()).to.be.false;
          expect(u.isDomElement({})).to.be.false;
          expect(u.isDomElement([])).to.be.false;
        });
      });
    });

    describe("Regular Expression", function () {
      it(".escapeRegExp (string)", function () {
        // when
        var string = "/\\d/";
        string = "http://www.google.com";

        // then
      });
      it(".replaceText (text, match, replacement)", function () {
        var match = "less", replacement = "more", text = u.replaceText("show less content", match, replacement);
        expect(text).to.be.equal("show more content");

        text = u.replaceText("show less content", "more", "less"); //no match
        expect(text).to.be.equal("show less content");
      });
    });
  });

});
