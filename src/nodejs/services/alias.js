"use strict";

var alias = {
    "home.html": "/",
    "lg.html": "/catalog.html",
    "samsung.html": "/price/?brand=samsung"
};

module.exports = function () {
    return function(req, res, next) {
        if (req.url == '/lg.html') {
            req.url = '/catalog.html?brands=lg';
            req.query = {
                brands: 'LG'
            }
        }
        next();
    };
};