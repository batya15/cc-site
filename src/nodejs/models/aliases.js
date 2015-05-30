"use strict";

var Aliases = function () {
    this.attributes = {};
};

Aliases.prototype = {
    constructor: Aliases,
    set: function (data) {
        this.attributes = data;
    },
    get: function (name) {
        return this.attributes[name];
    }
};

module.exports = new Aliases();