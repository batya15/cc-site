"use strict";

var Redirect = function () {
    this.attributes = {};
};

Redirect.prototype = {
    constructor: Redirect,
    set: function (data) {
        this.attributes = data;
    },
    get: function (name) {
        return this.attributes[name];
    }
};

module.exports = new Redirect();