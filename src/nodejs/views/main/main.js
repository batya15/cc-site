"use strict";

"use strict";

var View = require('entity/view');

var Main = function () {
    this.jadeFile = 'main';
};

Main.prototype = new View();


module.exports = new Main();
