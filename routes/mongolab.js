var mongoose = require("mongoose"),
  mongolabConfig = require("../configs/mongolabConfig"),
  Schema = mongoose.Schema;

/*
 * @ MongoDB w Mongoose
 * ----------------------------------
 * https://gist.github.com/pixelhandler/1791080
 * http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
 * http://blog.wercker.com/2013/06/20/Getting-started-with-Node-Mongoose-MongoDB-Part1.html
 */
mongoose.connect(mongolabConfig.todo, function (err) {
  if (err) {
    throw new Error("ERROR connectiong to mongolabConfig.todo");
  }
});
//exports.connection = mongoose.connection;

// Schema
var todoSchema = new Schema({
  title: {type: String, trim: true, required: true, unique: true},
  date: {type: Date, default: Date.now},
  completed: {type: Boolean, default: false}
});

// Collection
var TodoModel = mongoose.model("Item", todoSchema);

exports.getAll = function (req, res) {
  //find All result
  TodoModel
    .find()
    .setOptions({sort: "date"})
    .exec(function (err, data) {
      if (err) {
        errorReport(res, err);
      } else {
        res.json(data);
      }
    });
};

exports.post = function (req, res) {
  var record = new TodoModel({
    title: "test",
    completed: false
  });
  record.save(function (err) {
    if (err) {
      errorReport(res, err);
    } else {
      res.json({status: "save success"});
    }
  });
};

// helper
function errorReport(res, err) {
  res.status(500).send(err);
}
