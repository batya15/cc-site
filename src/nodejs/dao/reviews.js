"use strict";

var db = require('entity/db');

var DaoReviews = function () {
    this.name = 'DaoReviews';
};

DaoReviews.prototype = {
    constructor: DaoReviews,
    getApproved: function (cb) {
        db.query('SELECT * FROM `site_reviews` WHERE  `approved` > 0 ORDER BY  `site_reviews`.`time` DESC',
            cb);
    }
};

module.exports = new DaoReviews();