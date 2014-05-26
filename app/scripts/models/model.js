define(['underscore', 'backbone'], function (_, Backbone) {
  /*
   * @ BB Model
   * ----------------------------------
   * - contain single data model end point connenction and schema, data logic (validation, listen to model changes)
   */

  var ModelTodo = Backbone.Model.extend({
    // set default attribute
    defaults:   {
      title: "empty",
      completed: false
    },

    // set idAttribute if it's now "id", so can use todoModle.id
//    idAttribute: "_id",

//    url: "/weather",

    // initialize model
    // auto called, set model change listener
    initialize: function () {
      console.log("TodoModel initialized");

      // model attribute listener
      this.on("change", function () {
        console.log("model value changed");
      });

      this.on("change:completed", function () { // fire first
        var oldStatus = this.previous("completed"); //previous value
        var newStatus = this.get("completed");
        if (newStatus != oldStatus ) {
          console.log("model attr 'completed' changed");
        }
      });

      // validate listener
      this.on("invalid", function (model, error) {
        console.log(error);
      });
    },

    // Override fetch method to take options (set its own url)
    fetch: function (options) {
      this.url = options.url;
      // pass {reset: true} if need u just need rest the whole data instead of default merge data (still kept some old data)
      // http://backbonejs.org/#Collection-fetch
      return Backbone.Model.prototype.fetch.call(this, options);
    },

    // override parse response - auto called when fetched success
    // usage: var appointment = new Appointment(data, { parse: true });
//    parse: function (response) {
//      response = response.todo; //filter response
//      //transform & massage data field
//      response.description = response.desc;
//      delete response.desc;
//      return response;
//    },

    // override toJSON for seralize data back to server, use model.attribute for template
    toJSON: function () {
      // data transform for mathcing the server expected format, e.g. u set parse
      var attributes = _.clone(this.attributes);
      attributes.cankelled = attributes.cancelled;
      delete attributes.cancelled;
      return { appointment: attributes };
    },

    // validate attribute
    // only being called when passing {validate: true} on set or initial model, otherwize will be ignored
    validate: function (attr) {
//      if (_.isUndefined(attr.name)) return "Error: attr.name is undefined";
//      if (_.isNumber(attr.score)) return "Error: attr.score is not number";
    }
  });

  //@ Model attribute get/set
//  var todoModel = new TodoModel({title: "test"});
//  todoModel.fetch();
//  console.log(todoModel.get("title")); // get attribute
//  todoModel.set({completed: true}); // set attribute
//  todoModel.set("completed", true, {validate: true}); // validate on
//  console.log(todoModel.toJSON()); // print all model attribute

  //@ Model -> Server
  var todoModel = new ModelTodo();
  // save -> server via POST|PUT (need set url)
//  post/put new/updated model to server url, save will invoke validate()
//  todoModel.save(null, {
//    success: function (model, response) {
//      console.log(response.code);
//    }
//  });

  // fetch <- server via GET (need set url)

  todoModel.fetch({
    reset: true,
    url: "/weather",
    success: function (model, response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    }
  });

  // destroy -> server via DELETE w id
//  todoModel.destroy({
//    success: function (model, response) {
//    },
//    error: function (err) {
//      console.log(err);
//    }
//  });

  return ModelTodo;
});
