'use strict';

var dao = require('dao/reviews'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/reviews'),
    fs = require('fs');


var Reviews = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('reviews', this._initialize.bind(this));
};

Reviews.prototype = {
    constructor: Reviews,
    init: function (cb) {
        this._initialize(function () {
            log.info('review initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.getApproved(function (err, row) {
            if (!err && row) {
                model.set(row);
                log.info('load reviews');
            } else {
                log.error(err);
            }
            if (typeof cb === 'function') {
                cb(err, model);
            }
        });
    },
    api: function(app) {

    }
};

module.exports = new Reviews();
