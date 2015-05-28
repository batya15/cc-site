'use strict';

var dao = require('dao/menus'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/menus');

var Menu = function () {
    updater.on('all', this._build.bind(this));
    updater.on('menu', this._build.bind(this));
};

Menu.prototype = {
    init: function (cb) {
        this._build(function () {
            log.info('menus initialize');
            cb.apply(this, arguments);
        });
    },
    _build: function (cb) {
        var menus = {};
        dao.get(function (err, row) {
            if (!err && row) {
                row.forEach(function (item) {
                    if (!menus.hasOwnProperty(item.menu)) {
                        menus[item.menu] = []
                    }
                    if (item.submenu) {
                        if (!menus.hasOwnProperty(item.submenu)) {
                            menus[item.submenu] = []
                        }
                        item.submenu = menus[item.submenu];
                    }
                    menus[item.menu].push(item);
                });
                model.set(menus);
                log.info('build menus');
            }
            if (typeof cb === 'function') {
                cb(err);
            }
        });
    }
};

module.exports = new Menu();
