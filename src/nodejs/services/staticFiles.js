"use strict";

var dao = require('dao/staticFiles'),
    log = require('util/logger')(module),
    async = require('async'),
    fs = require('fs'),
    staticPath = require('util/config').get('staticPath'),
    updater = require('services/updater');

var StaticFiles = function () {
    updater.on('all', this._initialize.bind(this));
    updater.on('files', this._newFile.bind(this));
};

var encodeFileBase64 = function (data, cb) {
    var bitmap = new Buffer(data.fileBase64, 'base64');
    fs.writeFile(staticPath + data.filename, bitmap, function (err) {
        if (typeof cb === 'function') {
            cb(err);
        }
    });
};

StaticFiles.prototype = {
    constructor: StaticFiles,
    init: function (cb) {
        this._initialize(function () {
            log.info('staticFiles initialize');
            cb.apply(this, arguments);
        });
    },
    _initialize: function (cb) {
        dao.getAllFiles(function (err, row) {
            if (err) {
                if (typeof cb === 'function') {
                    cb(err);
                }
            } else {
                async.map(row, encodeFileBase64, function (err) {
                    log.info('all static files encoding');
                    if (typeof cb === 'function') {
                        cb(err);
                    }
                });
            }
        }.bind(this));
    },
    _newFile: function (id) {
        dao.getFileById(id, function (err, row) {
            if (row && !err) {
                encodeFileBase64(row);
            }
        })
    }
};

module.exports = new StaticFiles();