"use strict";

var async = require('async');

var _toString = Object.prototype.toString;
var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };
var _keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    return keys;
};

var _parallel = function(eachfn, tasks, data, callback) {
    callback = callback || function () {};
    if (_isArray(tasks)) {
        eachfn.map(tasks, function (fn, callback) {
            if (fn) {
                fn(data, function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    callback.call(null, err, args);
                });
            }
        }, callback);
    }
    else {
        var results = {};
        eachfn.each(_keys(tasks), function (k, callback) {
            tasks[k](data, function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                results[k] = args;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }
};

async.parallelCallWithoutArguments = function (tasks, data, callback) {
    _parallel({ map: async.map, each: async.each }, tasks, data, callback);
};

module.exports = async;
