"use strict";

var model = require('models/setting');

var Setting = function (name) {

};

Setting.prototype.render = function (data, cb) {
    var html = '';
    if (typeof data._params.name === 'object') {
        data._params.name.forEach(function(val) {
            html += model.get(val);
        });
    } else {
        html = model.get(data._params.name);
    }
    cb(null, html);
};

module.exports = new Setting();