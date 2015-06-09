var debug = function () {
    process.env['debug'] && console.log.apply(console, arguments);
};
var delay = function (cb) {
    setTimeout(cb, 1000);
};

var async = require('async');
var request = require('request');

async.series([
    function (cb) {
        request({
            uri: 'http://site.cc.co.ua/',
            method: 'GET'
        }, function (err, response, body) {
            cb();
        });
    },
    delay,
    function (cb) {
        request({
            uri: 'http://site.cc.co.ua/',
            method: 'GET'
        }, function (err, response, body) {
            cb();
        });
    },
    delay,
    function (cb) {
        request({
            uri: 'http://site.cc.co.ua/catalog/',
            method: 'GET'
        }, function (err, response, body) {
            cb();
        });
    },
    delay,
    function (cb) {
        request({
            uri: 'http://site.cc.co.ua/robots.txt',
            method: 'GET'
        }, function (err, response, body) {
            cb();
        });
    }
], function (err) {
    if (err) {
        debug("error", err);
        process.exit(1);
    } else {
        process.exit(0);
    }
});
