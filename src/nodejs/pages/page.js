"use strict";
var async = require('util/async');

// view collection
var views = require('models/views');

var Page = function (data) {
    var mainView = Object.keys(data.structure)[0];
    this._render = this.parse(data.structure[mainView], mainView);
};

Page.prototype = {
    constructor: Page,
    render: function (req, cb) {
        this._render.call(this, req, cb);
    },
    parse: function (data, name) {
        var view = views[name];
        var asyncArr = {};
        if (data.hasOwnProperty('views')) {
            for (var key in data['views']) {
                if (data['views'].hasOwnProperty(key)) {
                    asyncArr[key] = this.parse(data['views'][key], key);
                }
            }
        }
        return function (req, cb) {
            async.parallelCallWithoutArguments(asyncArr, req, function (err, result) {
                result._client = req;
                result._evn = data;
                view.render(result, cb);
            });
        }
    }
};

module.exports = Page;
