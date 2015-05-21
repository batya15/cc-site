"use strict";

var jade = require('jade'),
    fs = require('fs'),
    config = require('util/config').get('evn');

var View = function (jadeFile) {
    if (jadeFile) {
        this.jadeFile = jadeFile;
    }
};

View.prototype = {
    constructor: View,
    _template: function () {
        var template = function () {
                return '<div>Standart Function template in Module</div>';
            },
            self = this,
            loadJadeFile = function () {
                var templateJade = fs.readFileSync('template/' + self.jadeFile + '.jade', 'utf-8');
                return jade.compile(templateJade, {});
            };

        if (this.jadeFile) {
            if (config === 'dev') {
                template = function () {
                    try {
                        var f = loadJadeFile.apply(this, arguments);
                        return f.apply(this, arguments);
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                template = loadJadeFile.apply(this, arguments);
            }
        }

        this._template = template;
        return template.apply(this, arguments);
    },
    comparator: function(data, cb) {
        cb(null, data);
    },
    render: function (data, cb) {
        var self = this;
        this.comparator(data, function (err, res) {
            cb(err, self._template(res));
        });

    }
};

module.exports = View;