/*
 * @ use Mongoose to connect MongoDB on mongolab.com
 * ----------------------------------
 * - instead of using local MongoDB, use mongolab.com, create a db and user there
 * https://mongolab.com/databases/test#users
 * - use npm mongoose to operate mongoDB operation
 */
var mongoose = require("mongoose");
// mongolab db: test w user account
mongoose.connect("mongodb://shanzai12:andy12@ds045147.mongolab.com:45147/test");

// Connnection
module.exports.connection = mongoose.connection;

// Schema define
module.exports.presoSchema = mongoose.model("PresoCall", {
  uid: String,
  name: String,
  number: Number
});
