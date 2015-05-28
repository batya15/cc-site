"use strict";

var View = require('entity/view'),
    model = require('models/setting');

var Meta = function () {
    this.jadeFile = 'metaTags';
};

Meta.prototype = new View();

Meta.prototype.comparator = function (data, cb) {
    data = {
        metaTags: model.get('metaTags'),
        keywords: model.get('keywords'),
        description: model.get('description')
    };
    cb(null, data);
};

module.exports = new Meta();