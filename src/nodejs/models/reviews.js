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
    getRandomModels: function(count) {
        var arr = [], max, random;
        if (count >= this.models.length) {
            return this.models;
        } else {
            max = this.models.length - count;
            random = Math.floor(Math.random() * (max + 1));
            max = count + random;
            for (var i = random; i < max; i++) {
                    arr.push(this.models[i]);
            }
            return arr;
        }
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