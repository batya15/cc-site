"use strict";

var mailer = require('nodemailer'),
    config = require('util/config'),
    configMailer = config.get("mailer"),
    jade = require('jade'),
    settingModel = require('models/setting'),
    fs = require('fs');

var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: configMailer.login,
        pass: configMailer.password
    }
});


module.exports = {
    sendMail: function (type, data, email) {
        fs.readFile('template/mailerTemplate/' + type + '.2jade', 'utf8', function (err, res) {
            var html, templateFn;
            if (err) {
                html = JSON.stringify(data);
            } else {
                templateFn = jade.compile(res);
                html = templateFn(data);
            }

            if (config.get('evn') === 'dev') {
                console.log('send mail ' + type);
            } else {
                transporter.sendMail({
                    from: email || settingModel.get('email'),
                    to: 'batya.char@gmail.com',
                    subject: 'cc ' + type,
                    html: html
                });
            }
        });
    }
};
