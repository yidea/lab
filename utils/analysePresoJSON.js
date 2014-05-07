var _ = require("underscore");

// analysis data
//TODO: output time and error
module.exports = function (json) {
  var zones = json.zones,
    zone = null,
    configs = null,
    msg = "",
    errorMsg = "";
  console.log("---------------------------");

  // sort & loop zones, if not empty array then display
  var keys = _.keys(zones);
  keys.sort();
  _.each(keys, function (key) {
    msg = "";
    zone = zones[key];
    if (!_.isEmpty(zone)) {
      msg += key;
      msg += " has " + zone.length +" item";

      if (zone.length > 1) {
        errorMsg += key + "has >1 items";
      } else {
        // 1 zone, get zone name
        msg += " - " + zone[0].type;
        if (!_.isEmpty(zone[0].configs)) {
          configs = zone[0].configs;
          if (!_.isEmpty(configs.displayMode)) {
            msg += "(" + configs.displayMode + ")";
          }
        }
//        console.log(msg); //TODO:debug
      }
    }
  });

  if (_.isEmpty(errorMsg)) {
    errorMsg = "Error found: 0";
  }

  console.log("---------------------------");
  console.log(errorMsg); //TODO:debug
};
