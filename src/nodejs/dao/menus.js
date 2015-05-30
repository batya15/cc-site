"use strict";

var db = require('entity/db');

var DaoMenus = function () {};

DaoMenus.prototype = {
    constructor: DaoMenus,
    get: function (cb) {
        db.query('SELECT * FROM `site_menus` ORDER BY `cost` ASC', cb);
    }
};

module.exports = new DaoMenus();