"use strict";

var Reviews = function () {
    this.models = [];
};

Reviews.prototype = {
    constructor: Reviews,
    set: function (data) {
        this.models = data;
    },
    get: function (i) {
        return this.collection[i];
    },
    getModels: function(s, c) {
        var arr = [],
            start = s || 0,
            count = c || 1;

        for (var i = 0; i < count; i++) {
            if (start + i <= this.models.length) {
                arr.push(this.models[start + i]);
            }
        }
        return arr;

    }
};

module.exports = new Reviews();