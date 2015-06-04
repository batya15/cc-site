"use strict";

var async = require('util/async'),
    log = require("util/logger")(module);

var Services = function() {
    this.services = {
        redirect: require('./redirect'),
        aliases: require('./aliases'),
        setting: require('./setting'),
        menu: require('./menu'),
        update: require('./updater'),
        reviews: require('./reviews')
    };
};

Services.prototype = {
    constructor: Services,
    init: function (cb) {
        var tasks = {};
        for (var name in this.services) {
            if (this.services.hasOwnProperty(name)) {
                tasks[name] = (function (services) {
                    return function (cb) {
                        services.init(cb);
                    };
                })(this.services[name]);
            }
        }
        async.parallel(tasks, function (err, res) {
            if (err) {
                log.error(err);
            }
            log.info('*** ALL SERVICES INITIALIZE ***');
            cb(err, res);
        });
    },
    use: function (app) {
        for (var name in this.services) {
            if (this.services.hasOwnProperty(name) && typeof this.services[name]['expressUse'] === 'function') {
                this.services[name].expressUse(app);
            }
        }
    }
};

module.exports = new Services();