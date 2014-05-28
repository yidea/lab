define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
  /*
   * @ BB View
   * ----------------------------------
   * - when need view, a dom element that is interactive base on user's action/server data change
   */
  var ViewTodo = Backbone.View.extend({
//    template: JST['app/scripts/templates/todo.hbs'],
//    className: "list-view", //create div w class
//    el: ".body", //dom ref
    /*
     * @ events
     * ----------------------------------
     * - delegatedEvents this.$(".btn") and _onClickBtn will have this as context
     */
    events: {
      "click .btn": "_onClickBtn"
    },

    initialize: function () {
      console.log("TodoView initialized");

      // Cache dom el
//      this.$input = this.$('#new-todo');

      // Setup init
//      this.template =

      // bind context for method not in events{}
//      _.bindAll(this, "method1", "method2");

      // init subVIEW
//      this.subView1 = new SubView1({model: this.model});

      // VM Listner
      this.listenTo(this.model, "change", this.render);
      this.listenToOnce(this.model, "initLoad", this.render);

      // open for biz
      //this.model.fetch();
    },

    // Render: assemble MV, manual call
    render: function () {
      console.log("render");
//      this.$el.html(this.template(this.model.toJSON()));
//      this.$el.html(this.template(this.model.attributes)); // use attributes if toJSON is overrided for server
//      this.$el.append(this.subView1.render().el);

      return this; //for better chaining
    },

    // rebind use when event lost binding when view change
    rebind: function () {
      this.delegateEvents(this.events);
    },

    _onClickBtn: function (ev) {}

  });

  return ViewTodo;
});
