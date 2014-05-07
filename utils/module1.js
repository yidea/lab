// private scope
var i = 0; //local, if no var will be global variable
function count() {
  return ++i;
}

// public api exposed, return obj/function
module.exports = {
  count: count
};
