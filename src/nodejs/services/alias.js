"use strict";

var alias = {
    "home.html": "/",
    "lg.html": "/price/?brand=lg",
    "samsung.html": "/price/?brand=samsung"
};

module.exports = function () {
    return function(req, res, next) {
        if (req.url == '/home.html') {
            req.url = '/?sdsdfg=2';
            req.query = {
                sdsdfg: 'batya'
            }
        }
        next();
    };
};