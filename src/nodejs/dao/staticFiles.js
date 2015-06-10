"use strict";

var db = require('entity/db');

var StaticFiles = function () {
};

StaticFiles.prototype = {
    constructor: StaticFiles,
    getAllFiles: function (cb) {
        db.query('SELECT * FROM `files`', cb);
    },
    getFileById: function (id, cb) {
        db.queryRow('SELECT * FROM `files` WHERE `id`=?', [id], cb);
    }
};

module.exports = new StaticFiles();