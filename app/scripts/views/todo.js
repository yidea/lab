/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TodoView = Backbone.View.extend({
        template: JST['app/scripts/templates/todo.hbs']
    });

    return TodoView;
});
