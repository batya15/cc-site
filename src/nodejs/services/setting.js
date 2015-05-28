'use strict';

var dao = require('dao/setting'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/setting'),
    fs = require('fs');


var Setting = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('setting', this._initialize.bind(this));
};

Setting.prototype = {
    constructor: Setting,
    init: function (cb) {
        this._initialize(function () {
            log.info('setting initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.get(function (err, row) {
            if (!err && row) {
                model.set(row);
                log.info('load setting site');
            } else {
                log.error(err);
            }
            if (typeof cb === 'function') {
                cb(err, model);
            }
        });
    }
};

module.exports = new Setting();
