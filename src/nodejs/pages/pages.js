"use strict";

var path = require('path'),
    fs = require('fs'),
    async = require('util/async'),
    Page = require('./page');


var Pages = function () {
    this.pages = {};
};

Pages.prototype.init = function (app) {
    var normalizedPath = path.join(__dirname, "/json"),
        self = this;
    fs.readdirSync(normalizedPath).forEach(function (file) {
        var pageJson = require("./json/" + file),
            name = path.basename(file, '.json'),
            contentType, status;
        self.pages[name] = new Page(pageJson);

        if (pageJson.hasOwnProperty('content type')) {
            contentType = pageJson['content type'];
        }
        if (pageJson.hasOwnProperty('status')) {
            status = pageJson['status'];
        }

        app.get(pageJson.route, function (req, res) {
            if (contentType) {
                res.set('Content-Type', contentType);
            }
            if (status) {
                res.status(status);
            }
            self.pages[name].render(req, function(err, result) {
                res.send(result);
            });
        });
    });
};

Pages.prototype.renderPage = function (name, req, cb) {
    var page = this.pages[name] || {render: function() {cb(null, '<div>not fount page</div>');}};
    page.render(req, function (err, result) {
        cb(err, result);
    });
};

module.exports = new Pages();