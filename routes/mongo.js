/*
 * @ Mongoose for MongoDB access
 * ----------------------------------
 */
//exports.writeToMongolab = function (req, res) {
//  var record = new PresoSchema({
//    uid: +new Date(),
//    name: "test",
//    number: 12
//  });
//  //save
//  record.save(function (err) {
//    if (err) {
//      failure(err);
//    } else {
//      res.json({status: "success"});
//    }
//  });
//};

//exports.readMongolab = function (req, res) {
//  // find model all data and set sort criteria, read + callback
//  PresoSchema
//    .find()
//    .setOptions({sort: "uid"})
//    .exec(function (err, data) {
//      if (err) {
//        failure(err);
//      } else {
//        res.render("home", {
//          title: "readMongolab",
//          data: data
//        });
//      }
//    });
//};

// helper
//function failure(err) {
//  res.status(500).json({status: "failure"}); //interal error 500
//}
