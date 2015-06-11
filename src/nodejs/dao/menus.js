"use strict";

var db = require('entity/db');

var DaoMenus = function () {};

DaoMenus.prototype = {
    constructor: DaoMenus,
    get: function (cb) {
        db.query('SELECT `site_menus`.`id`, `site_menus`.`caption`, `site_menus`.`menu`, `site_menus`.`url`, `site_menus`.`submenu`, `site_menus`.`description`, `site_menus`.`cssClass`, `site_menus`.`hideUrl`, `files`.`filename` FROM  `site_menus` LEFT OUTER JOIN `files` ON  `site_menus`.`img` =  `files`.`id` ORDER BY  `site_menus`.`cost` ASC', cb);
    }
};

module.exports = new DaoMenus();