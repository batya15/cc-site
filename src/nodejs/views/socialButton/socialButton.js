"use strict";

var Module = require('entity/view'),
    service = require('services/menu');

var SubMenu = function () {
    this.jadeFile = 'socialButton';
};

SubMenu.prototype = new Module();

SubMenu.prototype.comparator = function (data, cb) {
    var share = '<script type="text/javascript" src="//yastatic.net/share/share.js" charset="utf-8"></script><div class="yashare-auto-init" data-yashareL10n="ru" data-yashareType="link" data-yashareQuickServices="vkontakte,facebook,twitter,odnoklassniki,moimir,lj,moikrug,gplus"></div>';

    cb(null, {menu: service.get('socialbutton'), share: share});
};


module.exports = new SubMenu();