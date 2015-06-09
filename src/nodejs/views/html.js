"use strict";

var View = require('entity/view'),
    Html = require('entity/viewHtml');

var templates = ['banner', 'footer', 'main', 'header', 'home', 'catalog', '404'];

module.exports = new Html(View, templates);