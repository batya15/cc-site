"use strict";

var View = require('entity/view');

var Html = function (ViewClass, templates) {
    var views = {};
    this.basicView = new ViewClass();
    templates.forEach(function (name) {
        views[name] = new ViewClass(name);
    });
    this.views = views;
};

Html.prototype = {
    constructor: Html,
    render: function (data, cb) {
        var view;
        if (data._params.hasOwnProperty('template') && this.views.hasOwnProperty(data._params.template)){
            view = this.views[data._params.template];
        } else {
            view = this.basicView;
        }
        view.render(data, cb)
    }
};

module.exports = Html;
