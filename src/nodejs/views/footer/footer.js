"use strict";

var Module = require('entity/view'),
    service = require('models/menus');

var SubMenu = function () {
    this.jadeFile = 'footer';
};

SubMenu.prototype = new Module();

SubMenu.prototype.comparator = function (data, cb) {
    cb(null, {menu: service.get('footer')});
};

module.exports = new SubMenu();