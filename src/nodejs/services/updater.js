"use strict";

var events = require('events'),
    io = require('socket.io-client'),
    log = require("util/logger")(module);

var Updater = function () {

};

Updater.prototype = new events.EventEmitter();

Updater.prototype.init = function (cb) {
        var self = this,
            socket =io('http://admin.cc.loc', {
                port: 3030
            });
        socket.on('connect', function(){
            log.info('Connected admin app');
            self.emit('all');
        });
        socket.on('update', function(data){
            self.emit(data.service);
        });
        socket.on('disconnect', function(){
            log.info('disconnect admin app');
        });
        log.info('Updater initialization');
        cb();
};

module.exports = new Updater();