"use strict";

var View = require('entity/view'),
    Html = require('entity/viewHtml');

var templates = ['banner', 'footer', 'main', 'header', 'measurement'];

module.exports = new Html(View, templates);