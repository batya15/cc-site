"use strict";

var events = require('events'),
    io = require('socket.io-client'),
    config = require('util/config'),
    log = require("util/logger")(module);

var Updater = function () {

};

Updater.prototype = new events.EventEmitter();

Updater.prototype.init = function (cb) {
        var self = this,
            socket =io(config.get('admin_server'), {
                port: config.get('admin_port')
            });
        socket.on('connect', function(){
            log.info('Connected admin app');
            self.emit('all');
        });
        socket.on('update', function(data){
            self.emit(data.service, data.data);
        });
        socket.on('disconnect', function(){
            log.info('disconnect admin app');
        });
        log.info('Updater initialization');
        cb();
};

module.exports = new Updater();