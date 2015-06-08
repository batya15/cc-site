"use strict";

var ExchangeRates = function () {
    this.attributes = {};
};

ExchangeRates.prototype = {
    constructor: ExchangeRates,
    set: function (data) {
        this.attributes = data;
    },
    get: function (name) {
        return this.attributes[name];
    },
    toJSON: function() {
        return JSON.stringify(this.attributes);
    }
};

module.exports = new ExchangeRates();