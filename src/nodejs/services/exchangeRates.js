"use strict";

var dao = require('dao/exchangeRates'),
    log = require('util/logger')(module),
    updater = require('services/updater'),
    model = require('models/exchangeRates');

var ExchangeRates = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('exchangeRates', this._initialize.bind(this));
};

ExchangeRates.prototype = {
    constructor: ExchangeRates,
    init: function (cb) {
        this._initialize(function () {
            log.info('exchange rates initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.getCurrentSetting(function (err, res) {
            if (err) {
                log.error(err);
            }
            if (res.cbrActive) {
                dao.getLastExchangeRates(function (error, current) {
                    this._setExchangeRates(error, {
                        USD: (current.USD * res.allowance).toFixed(4),
                        EUR: (current.EUR * res.allowance).toFixed(4)
                    }, cb);
                }.bind(this));
            } else {
                this._setExchangeRates(err, {USD: res.ratesUSD, EUR: res.ratesEUR}, cb);
            }
        }.bind(this));
    },
    _setExchangeRates: function (err, res, cb) {
        if (err) {
            log.error(err);
            return false;
        }
        if (model.get('USD') != res.USD || model.get('EUR') != res.EUR) {
            log.info('change exchange rates');
        }
        model.set(res);
        if (typeof cb === 'function') {
            cb(err, model);
        }
    }
};

module.exports = new ExchangeRates();
