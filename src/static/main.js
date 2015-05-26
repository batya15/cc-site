define('main', ['jquery', 'views/mainMenu'], function($, MainMenu) {


    if (document.readyState === 'complete') {
        initialize();
    } else {
        document.onready = initialize();
    }

    function initialize() {
     var mainMenu = new MainMenu({el: $('[data-id=mainMenu]')});
    }

});