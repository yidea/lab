/*
 * @ NodeJS
 * -------------
 * http://nqdeng.github.io/7-days-nodejs/#1
 * - Prototype fast&scalable HTTP server and files Async I/O, no window/document host
 * - Event loop + callback - order/ticketing system
 * - modular with require, exports, module
 * - nvm for node version management
 * - npm for node plugin management e.g. npm install underscore
 */

/*
 * @ NPM
 * ----------------------------------
 * - npm init will generate package.json (npm dependency) + index.js (entrypoint)
 * - npm install //auto intall npm modules if package.json already exist
 * - npm install express --save //install in /node_modules and save in package.json
 * - npm update //auto update npm modules to latest version
 * - npm uninstall express or npm prune (autoremove module that ur code is not using)
 * - npm start //will run the server if defined start: node app.js in package.json
 * - npm search mocha // search npm w keyword
 */

/*
 * @ Node V8 has different Host object than browser host
 * ----------------------------------
 * - Browser host: window, document, console,
 * - Node V8: global, require, module, process, console
 */

/*
 * @ Require & Module.export
 * ----------------------------------
 * - require: load module/file
 * //var json = require("./bower.json"); //load json file and return a json obj
 * - module: define with module.exports
 * - module scope and caching (use closure or construtor+return instance)
 */
var _ = require("underscore"); //underscore utils
var counter = require("./utils/module1");
console.assert(counter.count() === 1, counter.count());

/*
 * @ FS module
 * -------------
 * - File system I/O API
 */
var fs = require("fs"),
  path = require("path");

//copy file from src to dst - small files, use stream for large files
function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
}

// iterate files in folders = factorial n!
function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}
//travel("./dist/bower_components", function (pathname) {
  //console.log(pathname); //TODO:debug
//});

/*
 * @ Buffer & Stream
 * ----------------------------------
 * - Buffer is an addition to primitives, nodejs use buffer for stream. e.g. http.get
 */
// 1 load json synchronize w require
//var jsonSync = require("./package.json");

// 2 load json async w stream
var stream = fs.createReadStream("./package.json"); // read
//var write = fs.createWriteStream("./copy.json"); //create & write file
var data;
stream.on("data", function (chunck) {
  data += chunck;
});
stream.on("end", function () {
//  console.log(data); //finished loading
});

/*
 * @ HTTP module
 * -------------
 * - http server based on Event loop listener (will keep server running) + callback handler system
 */
// native http server
var http = require("http"); //http module
function handleRequest(req, res) { //callback(request, response)
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello nodejs"); //write response
  res.end();
}
//http.createServer(handleRequest).listen(3000); // create server and start listen to req

//var presoUrl = {
//  method: "GET",
//  host: "preview.vsearcher-newsite.walmartlabs.com",
//  path: "/preso/module_engine_category?categoryId=5438"
//};
//var analysePresoJSON = require("./utils/analysePresoJSON");
//presoCallback = function (res) {
//  var data = "",
//    timeStart = new Date();
//
//  res.on("data", function (chunk) { //get http.ClientResponse obj which is a readable stream
//    data += chunk;
//  });
//  res.on("end", function () {
//    var timeElapsed =  new Date() - timeStart;
//    var json = JSON.parse(data);
//    analysePresoJSON(json);
//  });
//};
//var presoResponse = http.get(presoUrl, presoCallback);
//presoResponse.on("error", function (ev) {
//  console.log("Error: HTTP GET - " + ev.message); //TODO:debug
//
//  // fallback on load local file
//  var json = require("./public/data/preso.json");
//  analysePresoJSON(json);
//});

/*
 * @ Events module
 * ----------------------------------
 */
var Emitter = require("events").EventEmitter;
var flightEmitter = new Emitter();
flightEmitter.emit("arrival", [1, 2]); // trigger
flightEmitter.on("arrival", function (data) { //listner
  console.log(data);
});

/*
 * @ Express + Handlebars + MongoDB/Mongoose + Session/Passport
 * ----------------------------------
 * - easy to scafolding Restful API + simple sites w jade as default template engine
 * - cli: express projectName
 */
var express = require("express"),
  exphbs = require("express3-handlebars"),
  path = require("path"),
  open = require("open"),
  routes = require("./routes"),
  app = express();

// express3-handlebars Advance usage
// https://github.com/ericf/express3-handlebars/blob/master/examples/advanced/app.js
// create ExpressHandlebars instance, setup layout & helper
hbs = exphbs.create({
  defaultLayout: "main",
  partialDir: ["views/partials"]
});

//express config
app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("view engine", "handlebars");
  app.engine("handlebars", hbs.engine);
  app.use(express.logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
//  app.use(express.router);
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "app")));
});

// dev only
app.configure("development", function () {
  app.use(express.errorHandler());
});

// routes
//app.get("/", function (req, res) { //root
////  res.end("Hello express");
//  res.render("home", { // view partial hbs
//    title: "hello world"
//  });
//});
app.get("/", routes.index);
app.get("/item/:number", routes.getItem); //w url param
app.get("/getJSON", routes.getJSON);
app.get("/readMongolab", routes.readMongolab); //read data from MongoLab via mongoose
app.post("/writeToMongolab", routes.writeToMongolab); //write to MongoLab via mongoose schema
app.get("/zhiBo", routes.getZhiBo); // web


// start server
http.createServer(app).listen(app.get("port"), function () {
//  open("http://localhost:3000"); //open url in ur default browser
  console.log("http server running on http://localhost:" + app.get("port"));
});

/*
 * @ Nodejs Debug
 * ----------------------------------
 * - Console.log
 * - Node-inspector
 */

/*
 * @ Unit testing
 * ----------------------------------
 * - mocha(test runner) + chai(assertion) + sinon (stub/spy) to test feature/function
 * - supertest to test http endpoint
 */

/*
 * @ Library
 * ----------------------------------
 * popular npm
 * - Gruntjs
 * - Async
 * - socket.io
 * - mongoose
 * - redis
 */

//TODO: a debug/analysis tool for cp modules + preview


