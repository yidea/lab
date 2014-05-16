//git push heroku master

var express = require('express'),
  exphbs = require("express3-handlebars"),
  path = require('path'),
  routes = require("./routes"),
  app = express();

// create ExpressHandlebars instance, setup layout & helper
var hbs = exphbs.create({
  defaultLayout: "main",
  partialDir: ["views/partials"]
});

// config express app
app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("view engine", "handlebars");
  app.engine("handlebars", hbs.engine);
  app.use(express.logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "app")));
});

// routes
app.get("/", routes.index);
app.get("/zhiBo", routes.getZhiBo);
app.get("/weather", routes.getWeather);

// start server
app.listen(app.get("port"), function() {
  console.log("Nodejs server listening on http://localhost:" + app.get("port"));
});
