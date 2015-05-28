"use strict";

var db = require('entity/db');

var DaoSetting = function () {
    this.name = 'DaoSetting';
    this.schema = {
        name: 'Интернет магази',
        slogan: '',
        phone: '',
        openingTimes: 'круглосуточное',
        yandexShare: '',
        robots: '',
        googleAnalytics: '',
        yandexMetrika: '',
        description: '',
        keywords: '',
        scripts: '',
        metaTags: '',
        email: ''
    };
};

DaoSetting.prototype = {
    constructor: DaoSetting,
    get: function (cb) {
        var self = this;
        db.queryRow('SELECT * FROM `site_setting` ORDER BY `active` DESC',
            function(err, res) {
                var result = res || self.schema;
                cb(err, result);
            });
    }
};

module.exports = new DaoSetting();