define(['underscore', 'backbone'], function (_, Backbone) {

  /*
   * @ BB Model
   * ----------------------------------
   * - contain single data model end point connenction and schema, data logic (validation, listen to model changes)
   */

  var TodoModel = Backbone.Model.extend({
    // set default attribute
    defaults:   {
      title: "empty",
      completed: false
    },

    // initialize model
    // auto called, set model change listener
    initialize: function () {
      console.log("TodoModel initialized");

      // model change listener
      this.on("change", function () {
        console.log("model value changed");
      });

      this.on("change:completed", function () { // fire first
        console.log("model value completed changed");
      });

      // validate listener
      this.on("invalid", function (model, error) {
        console.log(error);
      });
    },

    // validate attribute
    // only being called when passing {validate: true} on set or initial model, otherwize will be ignored
    validate: function (attributes) {
      if (_.isUndefined(attributes.name)) {
        return "Error: attributes.name is undefined";
      }
    }
  });

  // Model api
//  var todoModel = new TodoModel({title: "test"});
//  console.log(todoModel.get("title")); // get attribute
//  todoModel.set({completed: true}); // set attribute
//  todoModel.set("completed", true, {validate: true}); // validate on
//  console.log(todoModel.toJSON()); // print all model attribute

  return TodoModel;
});
