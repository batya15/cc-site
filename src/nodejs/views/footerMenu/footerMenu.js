"use strict";

var Module = require('entity/view'),
    service = require('models/menus');

var SubMenu = function () {
    this.jadeFile = 'footerMenu';
};

SubMenu.prototype = new Module();

SubMenu.prototype.comparator = function (data, cb) {
    cb(null, {menu: service.get('footermenu')});
};


module.exports = new SubMenu();