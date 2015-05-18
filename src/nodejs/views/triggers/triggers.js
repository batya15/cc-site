"use strict";

var Module = require('entity/view'),
    service = require('services/menu');

var SubMenu = function () {
    this.jadeFile = 'triggers';
};

SubMenu.prototype = new Module();

SubMenu.prototype.comparator = function (data, cb) {
    cb(null, {triggers: service.get('triggers')});
};


module.exports = new SubMenu();