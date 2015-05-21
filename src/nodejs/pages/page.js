"use strict";
var async = require('util/async'),
    conf = require('util/config').get('evn'),
    log = require('util/logger')(module);

// view collection
var views = require('models/views');

var Page = function (data) {
    this._render = this.parse(data.structure);
};

Page.prototype = {
    constructor: Page,
    render: function (req, cb) {
        this._render.call(this, req, cb);
    },
    parse: function (data) {
        var name = (typeof data === 'object')? data.view : data,
            view = views[name],
            asyncArr = {};
        if (!view) {
            log.error('NOT FOUND MODULE ' + name);
        }

        if (data.hasOwnProperty('views')) {
            for (var key in data['views']) {
                if (data['views'].hasOwnProperty(key)) {
                    asyncArr[key] = this.parse(data['views'][key]);
                }
            }
        }

        return function (req, cb) {
            async.parallelCallWithoutArguments(asyncArr, req, function (err, result) {
                result._client = req;
                result._evn = conf;
                result._params = data;
                view.render(result, cb);
            });
        }
    }
};

module.exports = Page;
