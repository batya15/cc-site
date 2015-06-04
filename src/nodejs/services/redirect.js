"use strict";

var dao = require('dao/redirect'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/redirect');

var Redirected = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('redirectList', this._initialize.bind(this));
};

Redirected.prototype = {
    constructor: Redirected,
    init: function (cb) {
        this._initialize(function () {
            log.info('redirect initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.get(function (err, row) {
            var redirectList = {};
            if (err) {
                log.error(err);
            } else {
                row.forEach(function (val) {
                    redirectList[val.source] = val.destination;
                });
                log.info('redirect list build');
                model.set(redirectList);
            }
            if (typeof cb === 'function') {
                cb(err, model);
            }
        });
    },
    expressUse: function (app) {
        app.use(function (req, res, next) {
            var url = model.get(req.originalUrl);
            if (url) {
                res.redirect(301, url);
            } else {
                next();
            }
        });
    }
};

module.exports = new Redirected();
