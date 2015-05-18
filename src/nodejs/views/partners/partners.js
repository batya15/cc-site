"use strict";

var Module = require('entity/view'),
    service = require('services/menu');

var SubMenu = function () {
    this.jadeFile = 'partners';
};

SubMenu.prototype = new Module();

SubMenu.prototype.comparator = function (data, cb) {
    cb(null, {menu: service.get('partners')});
};


module.exports = new SubMenu();