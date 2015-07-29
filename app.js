var _ = require("underscore"),
  express = require('express'),
  exphbs = require("express3-handlebars"),
  path = require('path'),
  multipart = require('connect-multiparty'),
  routes = require("./routes"),
//  mongodb =require("./routes/mongolab"),
  doc = require("./routes/doc"),
  hbsHelper = require("./utils/hbs.helper"),
  app = express();

// create ExpressHandlebars instance, setup layout & helper
var hbs = exphbs.create({
  defaultLayout: "layout-main",
  partialDir: ["views/partials"],
  helpers: hbsHelper
});

// config express app
app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("view engine", "handlebars");
  app.engine("handlebars", hbs.engine);
//  app.use(express.logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(multipart());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  app.use(express.static(path.join(__dirname, "app")));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "node_modules")));
});

// routes
app.get("/", routes.index);

// bb app
app.get("/todo", routes.todo);
app.get("/todo/*", routes.todo); //allow pushstate

// tool
app.get("/tool", routes.tool);
// doc
app.get("/doc", doc.index);
app.get("/doc/js", doc.javascript);
app.get("/doc/css", doc.css);
app.get("/doc/html", doc.html);
app.get("/doc/ds", doc.ds);
app.get("/doc/mobile", doc.mobile);
app.get("/doc/crossbrowser", doc.crossbrowser);
app.get("/doc/performance", doc.performance);
app.get("/doc/security", doc.security);

// demo
app.get("/demo", require("./routes/demo").init);

// app
app.get("/zhiBo", require("./routes/getZhiBo").init);
app.get("/tweets", require("./routes/botTweets").init);
app.get("/weather", require("./routes/botWeather").init);
app.get("/cssTricks", require("./routes/botCssTricks").init);
// api w mongolab
//app.get("/mongolab", mongodb.getAll);
//app.post("/mongolab", mongodb.post);

// start server
app.listen(app.get("port"), function() {
  console.log("Nodejs server listening on http://localhost:" + app.get("port"));
});
