"use strict";

var db = require('entity/db');

var Redirected = function () {
};

Redirected.prototype = {
    constructor: Redirected,
    get: function (cb) {
        db.query('SELECT * FROM `site_redirect`', cb);
    }
};

module.exports = new Redirected();