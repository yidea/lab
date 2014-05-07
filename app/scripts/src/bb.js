define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {

  // View
  var categoryAnalyticsView =  Backbone.view.extend({
    LOADING_SCROLL_TOP_PX: 103, // custom constant
    //template: _template(), //setup template

    /*
     * @ initialize/constructor
     * ----------------------------------
     * - initialize will be auto called on new View(),
     * - this.el is set to {el: $()}, el is Views's dom entry, if no el passed then will create empty <div>
     * - this.$el is auto cached for $(this.el),
     * - use this.$("selector") pattern for this.$el.find() this.$(".js-carousel-n-up-tab").hide();
     */
    initialize: function () {
      // members

      // data binding & template render(view listen to model) - use listenTo/listenToOnce (auto cleanup events) over on/once (manual cleanup)
      //this.model is passed when new View({})
      this.listenTo(this.model, {
        "change": this.render,
        "page-reload": this._showBusy //custom model event
      });

      // onPage load action e.g. create child view, analytics
      this._createChildViews();
    },

    /*
     * @ events
     * ----------------------------------
     * - event will be auto called on init, and all delegate to this.el w $this.el.on(event, "selector", cb)
     */
    events: {
      "click .category-main a[href]": "_onClickMainLink"
    },

    /*
     * @ render
     * ----------------------------------
     * - render by default is noop, override it for assoicate template with model change
     * - render can be called multiple times based on model change
     */
    render: function () {
      this.$el.html(this.template(this.model.attributes)); // .html() will unbind children's DOM events, so consider use childView for complex structure
//      this.delegateEvents()
      return this; // to enable chained calls
    },

    /*
     * @ remove
     * ----------------------------------
     * - NO Zombies - clean up all children view when remove parent
     * - remove view from DOM, and calls stopListening that view is listenTo
     */
    remove: function () {
      this._destroyChildViews();
      Backbone.View.prototype.remove.call(this);
    },

    _createChildViews: function () {
//      this.leftHandNavView = new LeftHandNavView({model: this.model, el: "#sidebar-container"});
    },

    _destroyChildViews: function () {
//      if (this.leftHandNavView) { this.leftHandNavView.remove(); this.leftHandNavView = null; }
    },

    _onClickMainLink: function (ev) {
      var $target = ev.currentTarget; // target the element which is bind to event listner, since this refer to View
      this.$(".js-carousel-n-up-tab").hide(); // scope to find inside this.$el
    }

  });

  return categoryAnalyticsView;
  // new CategoryAnalytics({el: $category, model: doc}); //create view and assign dom entry and data model

});
