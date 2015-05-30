"use strict";

var db = require('entity/db');

var Aliases = function () {
};

Aliases.prototype = {
    constructor: Aliases,
    get: function (cb) {
        db.query('SELECT * FROM `site_aliases`', cb);
    }
};

module.exports = new Aliases();