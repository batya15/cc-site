var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var alias = require('./services/alias');
var logger = require('morgan');
var pages = require('./pages/pages');
var services = require('services/services');

services.init(function () {
    var app = express();

// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(alias());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    pages.init(app);

/// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

/// error handlers
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    app.listen(3000);

});
