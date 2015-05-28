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
            contentType;
        self.pages[name] = new Page(pageJson);

        if (pageJson.hasOwnProperty('content type')) {
            contentType = pageJson['content type'];
        }

        app.get(pageJson.route, function (req, res) {
            if (contentType) {
                res.set('Content-Type', contentType);
            }
            self.pages[name].render(req, function(err, result) {
                res.send(result);
            });
        });
    });

};

module.exports = new Pages();