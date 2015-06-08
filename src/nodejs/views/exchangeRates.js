"use strict";

var model = require('models/exchangeRates');

var ExchangeRates = function () {

};

ExchangeRates.prototype.render = function (data, cb) {
    var html = model.toJSON();
    cb(null, html);
};

module.exports = new ExchangeRates();