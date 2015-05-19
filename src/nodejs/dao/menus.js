"use strict";

var db = require('entity/db');

var DaoMenus = function () {
    this.name = 'DaoUsers';
};

DaoMenus.prototype = {
    constructor: DaoMenus,
    get: function (cb) {
        db.query('SELECT * FROM `menus` ORDER BY `cost` ASC', cb)
    }
};

module.exports = new DaoMenus();