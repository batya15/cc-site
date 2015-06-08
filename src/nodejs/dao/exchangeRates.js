"use strict";

var db = require('entity/db');

var DaoExhangeRates = function () {
};

DaoExhangeRates.prototype = {
    constructor: DaoExhangeRates,
    getCurrentSetting: function (cb) {
        db.queryRow('SELECT * FROM `exchangeRatesSetting` ORDER BY  `exchangeRatesSetting`.`active` DESC ', cb);
    },
    getLastExchangeRates: function (cb) {
        db.queryRow('SELECT * FROM  `_CBR_rates` ORDER BY  `id` DESC', cb);
    }
};

module.exports = new DaoExhangeRates();