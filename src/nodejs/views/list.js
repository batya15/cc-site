"use strict";

var View = require('entity/view'),
    Html = require('entity/viewHtml'),
    service = require('models/menus');

var templates = ['footer', 'footerMenu', 'menu', 'menuType', 'partners', 'socialButton', 'subMenu', 'trigger'];

var List = function (name) {
    this.jadeFile = name;
};

List.prototype = new View();

List.prototype.comparator = function (data, cb) {
    cb(null, {list: service.get(data._params.namespace)});
};

module.exports = new Html(List, templates);

