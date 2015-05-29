"use strict";

var View = require('entity/view'),
    model = require('models/reviews');

function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 3) + '...';
    }

    return str;
}

var ReviewRotator = function () {
    this.jadeFile = 'reviewsRotator';
};

ReviewRotator.prototype = new View();

ReviewRotator.prototype.comparator = function (data, cb) {
    var list = [],
        SEX = ['', 'man', 'woman'],
        collection = model.getModels(0, 3);
    collection.forEach(function(item) {
        list.push({
            name: item.name,
            contact: item.contact,
            text: truncate(item.text, 150),
            sex: SEX[item.sex],
            avatar: item.avatar
        });
    });
    cb(null, {list: list});
};

module.exports = new ReviewRotator();