"use strict";

var View = require('entity/view'),
    Html = require('entity/viewHtml'),
    model = require('models/menus');

var templates = ['footer', 'footerMenu', 'mainMenu', 'menuType', 'partners', 'socialButton', 'subMenu', 'triggers'];

var List = function (name) {
    this.jadeFile = name;
};

List.prototype = new View();

List.prototype.comparator = function (data, cb) {
    data.list = model.get(data._params.namespace);
    cb(null, data);
};

module.exports = new Html(List, templates);

