var _ = require("underscore"),
  util = require("util");

//{{{sections.css}}}
//{{#section "css"}}
//<link rel="stylesheet" href="/styles/app/doc.css">
//{{/section}}
exports.section = function (name, options) {
  if(!this.sections) this.sections = {};
  this.sections[name] = options.fn(this);
  return;
};

//{{#htmlcode "pre"}}
//<button>text</button>
//{{/htmlcode}}
exports.htmlcode = function (context, options) {
  var result = "",
    html,
    lines;

  if (options == null) options = context;
  html = _.escape(options.fn(this));
  lines = html.split("\n");

  if (lines.length) {
    // dedent
    var dedent = 0;
    // find the non 0 dedent first
    _.find(lines, function (value) {
      value += ""; //covert to string
      dedent = value.match(/^(\s*)/)[0].length;
      if (dedent !== 0) {
        return true;
      }
    });

    var regexp;
    _.each(lines, function (value, index) {
      //remove dedent
      if (!dedent) {
        lines[index] = value.replace(/^\s+/g, "");
      } else {
        regexp = new RegExp("^\\s{" + dedent + "}");
        lines[index] = value.replace(regexp, "");
      }
    });
    html = lines.join("\n");
    // remove last \n
    html = html.replace(/\n$/, "");
  }
  result += util.format("<code>%s</code>", html);
  if (context === "pre") {
    result = util.format("<pre>%s</pre>", result);
  }
  return result;
};
