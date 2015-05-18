"use strict";

var db = require('entity/db'),
    log = require("util/logger")(module);

var Menu = function () {
    this.menus = {};
};

Menu.prototype = {
    init: function (cb) {
        var self = this;
        db.query('SELECT * FROM `menus` ORDER BY `cost` ASC', function (err, row) {
            row.forEach(function (item) {
                if (!self.menus.hasOwnProperty(item.menu)) {
                    self.menus[item.menu] = []
                }
                if (item.submenu) {
                    if (!self.menus.hasOwnProperty(item.submenu)) {
                        self.menus[item.submenu] = []
                    }
                    item.submenu = self.menus[item.submenu];
                }
                self.menus[item.menu].push(item);
            });
            log.info('initialize');
            cb(err);
        });
    },
    get: function (name) {
        return this.menus[name];
    }
};

module.exports = new Menu();
