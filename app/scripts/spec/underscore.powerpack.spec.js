define(["underscore", "src/underscore.powerpack"], function (_) {

  describe("underscore.powerpack", function () {

    /***************** String helper *********************/
    describe("String", function () {
      describe("_.format(str)", function () {
        it("should return '' in case str not set", function () {
          expect(_.format()).to.be.equal("");
        });
        it("should return string correctly in general case", function () {
          expect(_.format("<h1>%s - %s</h1>", "23", "30")).to.be.equal("<h1>23 - 30</h1>");
          expect(_.format("hello %s %s", 2, "world")).to.be.equal("hello 2 world");
        });
        it("should return string correctly in case where %s and arguments number not match", function () {
          expect(_.format("<h1>%s</h1>", "23", "30")).to.be.equal("<h1>23</h1>");
          expect(_.format("<h1>%s-%s</h1>", "23")).to.be.equal("<h1>23-</h1>");
        });
      });
      
      describe("_.reverse(str)", function () {
        it("should return reversed array in general cases", function () {
          expect(_.reverse("walmart")).to.equal("tramlaw");
        });
        it("should throw in cases str not set or not valid", function () {
          expect(_.reverse).to.throw();
          expect(_.reverse.bind(null, 123)).to.throw();
        });
      });

      describe("_.trim(str)", function () {
        it("should throw error in case str not set", function () {
          expect(_.trim).to.throw(Error);
        });
        it("should return trimmed string in general case", function () {
          expect(_.trim(" abc")).to.equal("abc");
          expect(_.trim(" abc ")).to.equal("abc");
          expect(_.trim("abc ")).to.equal("abc");
          expect(_.trim("abc")).to.equal("abc");
        });
      });

      describe("_.ltrim(str)", function () {
        it("should throw error in case str not set", function () {
          expect(_.ltrim).to.throw(Error);
        });
        it("should return trimmed string in general case", function () {
          expect(_.ltrim(" abc")).to.equal("abc");
          expect(_.ltrim(" abc ")).to.equal("abc ");
          expect(_.ltrim("abc ")).to.equal("abc ");
          expect(_.ltrim("abc")).to.equal("abc");
        });
      });

      describe("_.rtrim(str)", function () {
        it("should throw error in case str not set", function () {
          expect(_.rtrim).to.throw(Error);
        });
        it("should return trimmed string in general cases", function () {
          expect(_.rtrim(" abc")).to.equal(" abc");
          expect(_.rtrim(" abc ")).to.equal(" abc");
          expect(_.rtrim("abc ")).to.equal("abc");
          expect(_.rtrim("abc")).to.equal("abc");
        });
      });

      describe("_.removeWhitespace(str)", function () {
        it("should throw error in case str not set", function () {
          expect(_.removeWhitespace).to.throw();
        });
        it("should return string without whitespace in general cases", function () {
          expect(_.removeWhitespace(" A =  B  ")).to.equal("A=B");
          expect(_.removeWhitespace("A=B")).to.equal("A=B");
        });
      });

      describe("_.countBytesUTF8(str, countWhitespace)", function () {
        it("should throw error in case str not set", function () {
          expect(_.countBytesUTF8).to.throw();
        });
        it("should return utf8 bytes in general cases w/wo whitespace", function () {
          expect(_.countBytesUTF8("walmart 中文 ")).to.equal(15);
          expect(_.countBytesUTF8("walmart 中文 ", false)).to.equal(13);
        });
      });

      describe("_.fixedCharCodeAt(str, idx)", function () {
        it("should return charCode number in general cases of BMP", function () {
          expect(_.fixedCharCodeAt("ABC", 0)).to.equal(65);
          expect(_.fixedCharCodeAt ('\uD800\uDC00', 0)).to.equal(65536);
          expect(_.fixedCharCodeAt ('\uD800\uDC00', 1)).to.equal(false);
        });
      });

    });


    /***************** Number helper *********************/
    describe("Number", function () {
      describe("_.convertNumBase(num)(fromBase)(toBase)", function () {
        it("should return ", function () {
          expect(_.convertNumBase(0xDB7F)(16)(10)).to.equal("352657"); //16->10
        });
      });

      describe("_.hex2decimal(hex)", function () {
        it("should throw error in case hex not set", function () {
          expect(_.hex2decimal).to.throw(Error);
        });
        it("should return decimal in general cases", function () {
          expect(_.hex2decimal(0xDB7F)).to.equal(352657);
          expect(_.hex2decimal("xxxxx")).to.be.NaN;
        });
      });

      describe("_.decimal2hex(decimal)", function () {
        it("should throw error in case decimal not set", function () {
          expect(_.decimal2hex).to.throw(Error);
        });
        it("should return decimal in general cases", function () {
          expect(_.decimal2hex(305441741)).to.equal("1234ABCD");
        });
      });

      describe("_.binary2decimal(binary)", function () {
        it("should throw error in case binary not set", function () {
          expect(_.binary2decimal).to.throw(Error);
        });
        it("should return decimal in general cases", function () {
          expect(_.binary2decimal("011")).to.equal(3);
          expect(_.binary2decimal(111)).to.equal(7);
        });
      });

      describe("_.decimal2binary(decimal)", function () {
        it("should throw error in case decimal not set", function () {
          expect(_.decimal2binary).to.throw(Error);
        });
        it("should return decimal in general cases", function () {
          expect(_.decimal2binary("3")).to.equal("11");
          expect(_.decimal2binary(7)).to.equal("111");
        });
      });

      describe("_.rgb2hex(r, g, b)", function () {
        it("should return hex from rgb", function () {
          expect(_.rgb2hex(255, 255, 255)).to.equal("#FFFFFF");
        });
      });

      describe("_.hex2rgb(hex)", function () {
        it("should return [r,g,b] from hex", function () {
          expect(_.hex2rgb("#c3c3c3")).to.eql([195, 195, 195]);
          expect(_.hex2rgb("#fff")).to.eql([255, 255, 255]);
        });
      });
    });

  });
});
