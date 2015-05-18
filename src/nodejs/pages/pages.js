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
            name = path.basename(file, '.json');
        self.pages[name] = new Page(pageJson);

        app.get(pageJson.route, function (req, res) {
            self.pages[name].render(req, function(err, result) {
                res.send(result);
            });
        })
    });

};

module.exports = new Pages();