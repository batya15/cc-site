"use strict";

var Menus = function () {
    this.attributes = {};
};

Menus.prototype = {
    constructor: Menus,
    set: function (data) {
        this.attributes = data;
    },
    get: function (name) {
        return this.attributes[name];
    }
};

module.exports = new Menus();