"use strict";

var Setting = function () {
    this.attributes = {};
};

Setting.prototype = {
    constructor: Setting,
    set: function (data) {
        this.attributes = data;
    },
    get: function (name) {
        return this.attributes[name];
    }
};

module.exports = new Setting();