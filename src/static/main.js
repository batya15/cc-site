define('main', ['jquery', 'underscore', 'views/mainMenu', 'views/slider/slider'],
    function($, _, MainMenu, Slider) {


    if (document.readyState === 'complete') {
        initialize();
    } else {
        document.onready = initialize();
    }

    function initialize() {
     var mainMenu = new MainMenu({el: $('[data-id=mainMenu]')});
        _.defer(function () {
            var slider = new Slider({el: $('[data-slider=slider]')});
        });

    }

});