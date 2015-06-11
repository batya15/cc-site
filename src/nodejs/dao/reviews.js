"use strict";

var db = require('entity/db');

var DaoReviews = function () {};

DaoReviews.prototype = {
    constructor: DaoReviews,
    getApproved: function (cb) {
        db.query('SELECT `site_reviews`.`id`, `site_reviews`.`name`, `site_reviews`.`contact`, `site_reviews`.`text`, ' +
            '`site_reviews`.`time`, `site_reviews`.`sex`, `files`.`filename` FROM  `site_reviews` LEFT OUTER JOIN `files` ' +
            'ON  `site_reviews`.`img` =  `files`.`id` WHERE `site_reviews`.`approved` > 0 ORDER BY  `site_reviews`.`time` DESC',
            cb);
    }
};

module.exports = new DaoReviews();