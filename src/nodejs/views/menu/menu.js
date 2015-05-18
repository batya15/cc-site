"use strict";

var Module = require('entity/view'),
    service = require('services/menu');

var Menu = function () {
    this.jadeFile = 'menu';
};

Menu.prototype = new Module();

Menu.prototype.comparator = function (data, cb) {
    cb(null, {menu: service.get('main')});
};

module.exports = new Menu();