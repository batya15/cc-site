var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var pages = require('./pages/pages');
var services = require('services/services');
var config = require('util/config');

services.init(function () {
    var app = express();
    app.set('env', (config.get('evn') === 'dev')? 'development' : 'production');
    app.disable('x-powered-by');
    app.use(logger(config.get('evn')));
    services.use(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    pages.init(app);

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        var data = {
            status: err.status || 500,
            message: err.message,
            err: (config.get('evn') === 'dev')? err: null
        };
        pages.renderPage('404', data, function (err, html) {
            res.send(html);
        });
    });

    app.listen(config.get('port'));

});
