"use strict";

var dao = require('dao/aliases'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/aliases'),
    url = require('url');

var Aliases = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('aliases', this._initialize.bind(this));
};

Aliases.prototype = {
    constructor: Aliases,
    init: function (cb) {
        this._initialize(function () {
            log.info('aliases initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.get(function (err, row) {
            var aliases = {};
            if (err) {
                log.error(err);
            } else {
                row.forEach(function (val) {
                    aliases[val.alias] = url.parse(val.url, true);
                });
            }
            log.info('aliases load');
            model.set(aliases);
            if (typeof cb === 'function') {
                cb(err, model);
            }
        });
    },
    expressUse: function (app) {
        app.use(function (req, res, next) {
            var alias = model.get(req.url);
            if (alias) {
                req.url = alias.pathname;
                req.query = alias.query;
            }
            next();
        });
    }
};

module.exports = new Aliases();
