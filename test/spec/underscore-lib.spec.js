/*
* Specs - underscore-lib
*
* grunt test
* localhost:9001
* http://chaijs.com/api/bdd/
*/
define(["jquery", "scripts/src/underscore-lib.js"], function ($, u) {
  describe("Util", function () {
    // Setup
    var collection,
      divs = document.querySelectorAll("div"),
      div = document.querySelector("div"),
      $divs = $("div"),
      objPerson = {name: "person1", age: 23};

    describe("@ Collection", function () {
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
        it("should exit loop when callback returns false", function(){
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
        it("should work w using this to refer to element when using context", function(){
          collection = [1, 2, 3];
          var results = [];
          // when
          u.each(collection, function (value, index) {
            results.push(++this[index]);
          }, collection);
          // then
          expect(collection).to.eql([2, 3, 4]);
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
        it("should return false when obj is string", function(){
          // it doesn't work with string for now
          expect(u.contains("search=a&cat_id=123", "cat_id")).to.be.false;
        });
      });

      describe(".some (obj, callback, context)", function () {
        it("should return false when obj not valid", function(){
          var result = u.some(null, function (value) {return value === 1;});
          expect(result).to.be.false;
          result = u.some(undefined, function (value) {return value === 1;});
          expect(result).to.be.false;
        });
        it("should return true when has item pass the test", function(){
          // when array
          var result = u.some([1, 2, 3], function (value, key, list) {
            return value === 1;
          });
          // then
          expect(result).to.be.true;
          // when obj
          result = u.some({a: "1", b: 2, c: 3}, function (value, key, list) {
            return value === "1";
          });
          // then
          expect(result).to.be.true;
        });
        it("should return false when has no item pass the test", function(){
          // when array
          var result = u.some([1, 2, 3], function (value, key, list) {
            return value === 4;
          });
          // then
          expect(result).to.be.false;
          // when obj
          result = u.some({a: "1", b: 2, c: 3}, function (value, key, list) {
            return value === 1;
          });
          // then
          expect(result).to.be.false;
        });
      });
    });


    describe("@ Array", function () {
      describe(".max (obj, [callback], [context])", function () {
        it("should return max number from array correctly", function(){
          expect(u.max([-1, -2, 0])).to.equal(0);
          expect(u.max([-100, -200])).to.equal(-100);
          expect(u.max([])).to.equal(-Infinity);
          var arrAge = [{age: 12}, {age: 20}];
          expect(u.max(arrAge, function (item) {
            return item.age; //compare age
          })).to.equal(20);
        });
      });

      describe(".min (obj, [callback], [context])", function () {
        it("should return max number from array correctly", function(){
          expect(u.min([-1, -2, 0])).to.equal(-2);
          expect(u.min([-100, -200])).to.equal(-200);
          expect(u.min([])).to.equal(Infinity);

          var arrAge = [{age: 12}, {age: 20}];
          expect(u.min(arrAge, function (item) {
            return item.age; //compare age
          })).to.equal(12);
        });
      });

      describe(".sort (array, callback)", function () {
        it("should sort number in desc order", function(){
          // given
          var array = [4, 2, 5];
          var strArray = ["1", "10", "2"];
          // when
          u.sort(strArray);
          u.sort(array, function (a, b) {
            return a - b; // asc sort
          });
          // then
          expect(strArray).to.eql(["1", "10", "2"]);
          expect(array).to.eql([2, 4, 5]); //asc
          u.sort(array, function (a, b) {
            return b - a; //desc
          });
          expect(array).to.eql([5, 4, 2]); //desc
        });
      });

      describe(".unique (array)", function () {
        it("should return null when array is not valid", function(){
          expect(u.unique()).to.be.null;
          expect(u.unique({})).to.be.null;
        });

        it("should return value duplicate-free array", function(){
          // when
          var arr = u.unique([1, 1, 2, 2, 3]);
          // then
          expect(arr).to.eql([1,2,3]);
          // when
          arr = u.unique("test");
          expect(arr.join("")).to.equal("tes");
        });
      });

      describe(".union (*arrays)", function () {
        it("should return unioned and uniqued array when 3 array", function(){
          // when 3 array
          var arr = u.union([1], [1, 2, 3], [1, 2]);
          // then
          expect(arr).to.eql([1, 2, 3]);
          // when 2 array
          arr = u.union([1, 2, 3], [3, 4]);
          expect(arr).to.eql([1, 2, 3, 4]);
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


    describe("@ Object", function () {
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

      describe(".keys (obj)", function () {
        it("should throw error when obj is not valid object", function(){
          expect(u.keys.bind(undefined, 2)).to.throw(TypeError);
          expect(u.values.bind(undefined, "abc")).to.throw(TypeError);
        });
        it("should return keys as array when obj is valid object", function(){
          expect(u.keys({})).to.eql([]);
          expect(u.keys({name: "yi", age: "1"})).to.eql(["name", "age"]);
          expect(u.keys([1, 2])).to.eql(["0", "1"]); // array is essential object with index
        });
      });

      describe(".values (obj)", function () {
        it("should throw error when obj is not valid object", function(){
          expect(u.values.bind(undefined, 2)).to.throw(TypeError);
          expect(u.values.bind(undefined, "abc")).to.throw(TypeError);
        });
        it("should return values as array when obj is valid object", function(){
          expect(u.values({})).to.eql([]);
          expect(u.values({name: "test", age: "10"})).to.eql(["test", "10"]);
          expect(u.values([1, 2])).to.eql([1, 2]);
        });
      });
      
      describe(".size (obj)", function () {
        it("should return 0 when obj is not valid object", function(){
          expect(u.size(null)).to.equal(0);
          expect(u.size(1)).to.equal(0);
        });
        it("should return obj size when obj is valid object/hashtable", function(){
          expect(u.size({})).to.equal(0);
          expect(u.size({name: "yi", age: "11"})).to.equal(2);
          expect(u.size([1, 2])).to.equal(2);
          expect(u.size($divs)).to.equal(4); //jq object hashtable
          expect(u.size("string")).to.equal(6);
        });
      });

      describe(".extend (target, *source)", function () {
        it("should return null when params are not valid", function(){
          expect(u.extend(0, {name:"test"})).to.eql(0);
          expect(u.extend("abc", {name:"test"})).to.eql("abc");
        });
        it("should return correct obj when extend correctly", function(){
          //2 param
          expect(u.extend({firstname:"first"}, {lastname:"last", age:20})).to.eql({firstname:"first", lastname: 'last', age: 20 });
          //3 param and override
          expect(u.extend({}, {name:"first", age:"1"}, {title:"fe", age:"20"})).to.eql({name: "first", age: '20', title: 'fe' });
          //array
          expect(u.extend([], [1])).to.eql([1]);
        });
      });
      
      describe(".map (obj, callback, [context])", function () {
        it("should return array correctly when obj is array", function(){
          // when
          var array = u.map([1, 2, 3], function (value) {
            return value * 2;
          });
          // then
          expect(array).to.eql([2, 4, 6]);
        });

        it("should return array correctly when obj is object", function(){
          // when
          var array = u.map({one: 1, two: 2}, function (value, key) {
            return key;
          });
          // then
          expect(array).to.eql(["one", "two"]);
        });
      });

      describe(".pluck (obj, key)", function () {
        it("should throw error when obj is invalid", function(){
          expect(u.pluck.bind(undefined, 1, "age")).to.throw(TypeError);
        });
        it("should return array correctlly when obj is valid", function(){
          expect(u.pluck([objPerson, objPerson], "age")).to.eql([23, 23]);
        });
      });

      describe(".pairs (obj)", function () {
        it("should return array of [key, value] when obj is valid", function(){
          expect(u.pairs(objPerson)).to.eql([["name", "person1"], ["age", 23]]);
        });
      });

      describe(".reduce (obj, callback, initial, context)", function () {
        it("should return value correctly", function(){
          // when
          var result = u.reduce([1, 2, 3], function (initial, num) {
            return initial + num;
          });
          // then
          expect(result).to.be.equal(6);
        });
      });
    });
    
    
    describe("@ Function", function () {
      describe(".delay(fn, time)", function () {
        it("should work and return timestamp", sinon.test(function(){
          // when
          this.spy = sinon.spy();
          var timestamp = u.delay(this.spy, 100);
          this.clock.tick(100);
          // then
          expect(this.spy).to.be.calledOnce;
          expect(timestamp).to.be.a("number");
        }));
      });
      
      describe(".defer(fn)", function () {
        it("should work and return timestamp", sinon.test(function(){
          // when
          this.stub(u, "delay");
          u.defer(function () {});
          this.clock.tick(100);
          // then
          expect(u.delay).to.be.calledOnce;
        }));
      });
      
      describe(".bind (fn, context, *arg)", function () {
        it("should return function that bind the new context", function(){
          function say(msg) {
            return this.name + ": " +  msg;
          }
          // when
          var fn = u.bind(say, {name: "yi"}, "hi");
          // then
          expect(fn()).to.equal("yi: hi");
        });
      });
      
      describe(".bindAll(object, *methodNames)", function () {
        it("should work", sinon.test(function(){
          // when
          var divView = {
            name: "divView",
            init: function () {
              u.bindAll(this, "onClick", "onHover");
              this.addHandler();
            },
            addHandler: function () {
              $("div:eq(0)").on("click", this.onClick);
              $("div:eq(0)").on("mouseover", this.onHover);
            },
            onClick: function () {
              this.name = "onClick";
            },
            onHover: function () {
              this.name = "onHover";
            }
          };
          this.spy = sinon.spy(divView, "onClick");
          divView.init();
          $("div:eq(0)").trigger("click");
          // then
          expect(this.spy).to.be.calledOnce;
          expect(divView.name).to.equal("onClick");
        }));
      });

    });
    
    describe("@ Type Check", function () {
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
          expect(u.isNull()).to.be.false; //undefined
          expect(u.isNull(1)).to.be.false;
          expect(u.isNull("")).to.be.false;
          expect(u.isNull({})).to.be.false;
          expect(u.isNull([])).to.be.false;
          expect(u.isNull(function () {})).to.be.false;
        });
      });
      
      describe(".isNaN (obj)", function () {
        it("should return true when obj is NaN", function(){
          expect(u.isNaN(NaN)).to.be.true;
        });

        it("should return true when obj is not NaN", function(){
          expect(u.isNaN(undefined)).to.be.false; //native isNaN(undefined) = true;
          expect(u.isNaN(null)).to.be.false;
          expect(u.isNaN(0)).to.be.false;
          expect(u.isNaN("")).to.be.false;
          expect(u.isNaN("37")).to.be.false;
          expect(u.isNaN({})).to.be.false;
          expect(u.isNaN([])).to.be.false;
        });
      });
      
      describe(".isFinite (obj)", function () {
        it("should return false when obj is Infinity or -Infinity", function(){
          expect(u.isFinite(Infinity)).to.be.false;
          expect(u.isFinite(-Infinity)).to.be.false;
          expect(u.isFinite(undefined)).to.be.false;
          expect(u.isFinite(null)).to.be.false;
          expect(u.isFinite("abc")).to.be.false;
          expect(u.isFinite({})).to.be.false;
          expect(u.isFinite([])).to.be.false;

        });
        it("should return true when obj is finite number/string", function(){
          expect(u.isFinite(100)).to.be.true;
          expect(u.isFinite(2e100)).to.be.true;
        });
      });

      describe(".isEqual (a, b)", function () {
        it("should return true when obj is primitive", function(){
          expect(u.isEqual("abc", "abc")).to.be.true;
          expect(u.isEqual(12, 12)).to.be.true;
          expect(u.isEqual(true, true)).to.be.true;
        });
        it("should return true when obj is primitive", function(){
          expect(u.isEqual("abc", "abcd")).to.be.false;
          expect(u.isEqual(12, 123)).to.be.false;
          expect(u.isEqual(true, false)).to.be.false;
        });
        it("should return true when obj is reference object type and value equal", function(){
          expect(u.isEqual([1, 2, 3], [1, 2, 3])).to.be.true;
          expect(u.isEqual([1, 2, [3, 4]], [1, 2, [3, 4]])).to.be.true;
          expect(u.isEqual({name: [1,2]}, {name: [1,2]})).to.be.true;
        });
        it("should return false when obj is reference object type and value NOT equal", function(){
          expect(u.isEqual(null, undefined)).to.be.false;
          expect(u.isEqual(null, [])).to.be.false;
          expect(u.isEqual([1, 2], [1, 2, 3])).to.be.false;
          expect(u.isEqual([1, 2, [3, 4]], [1, 2, 3, 4])).to.be.false;
          expect(u.isEqual({name: [1,2]}, {name: 1, age: 12})).to.be.false;
        });
      });

      describe(".isEmpty (obj)", function () {
        it("should return true is obj is null or empty", function(){
          expect(u.isEmpty(undefined)).to.be.true; //undefined
          expect(u.isEmpty(null)).to.be.true; //null
          expect(u.isEmpty("")).to.be.true; //string
          expect(u.isEmpty([])).to.be.true; //array
          expect(u.isEmpty({})).to.be.true; //object
          expect(u.isEmpty(1)).to.be.true; //int
          expect(u.isEmpty(0)).to.be.true; //int
        });
        it("should return false is obj is not null and not empty", function(){
          expect(u.isEmpty(" ")).to.be.false;
          expect(u.isEmpty([1, 2])).to.be.false;
          expect(u.isEmpty($divs)).to.be.false;
          expect(u.isEmpty({name: "test"})).to.be.false;
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
        it("should return true when obj is Array || String || Nodelist || Hashtable like -jQueryObject", function () {
          expect(u.isArrayLike([1, 2])).to.be.true;
          expect(u.isArrayLike(divs)).to.be.true;
          expect(u.isArrayLike("test")).to.be.true;

        });
        it("should return false when obj is not ArrayLike", function () {
          expect(u.isArrayLike({name: "test"})).to.be.false;
          expect(u.isArrayLike(function () {})).to.be.false;
          expect(u.isArrayLike(div)).to.be.false;
        });
      });

      describe(".isObject (obj)", function () {
        it("should return true when obj is array|object|function|hashtable-like", function () {
          expect(u.isObject({age: 12})).to.be.true;
          expect(u.isObject([1, 2])).to.be.true;
          expect(u.isObject(function(){})).to.be.true;
          expect(u.isObject(divs)).to.be.true;
          expect(u.isObject($divs)).to.be.true;
        });
        it("should return false when obj is not array|object|function|hashtable-like", function () {
          expect(u.isObject(null)).to.be.false;
          expect(u.isObject()).to.be.false;
          expect(u.isObject(1)).to.be.false;
          expect(u.isObject("string")).to.be.false;
        });
      });

      describe(".isPlainObject (obj)", function () {
        it("should return true when obj is a plain object", function(){
          expect(u.isPlainObject({name: "test"})).to.be.true;
        });
        it("should return false when obj is not a plain object", function(){
          expect(u.isPlainObject([])).to.be.false;
          expect(u.isPlainObject(null)).to.be.false;
          expect(u.isPlainObject("string")).to.be.false;
          expect(u.isPlainObject(1)).to.be.false;
          expect(u.isPlainObject(function(){})).to.be.false;
          expect(u.isPlainObject(divs)).to.be.false;
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

    describe("@ Regular Expression", function () {
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
