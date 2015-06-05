define('main', ['jquery', 'underscore', 'views/mainMenu', 'views/slider/slider', 'views/reviewsRotator/reviewsRotator'],
    function ($, _, MainMenu, Slider, ReviewsRotator) {


        if (document.readyState === 'complete') {
            initialize();
        } else {
            document.onready = initialize();
        }

        function initialize() {
            var mainMenu = new MainMenu({el: $('[data-id=mainMenu]')});
            _.defer(function () {
                new Slider({el: $('[data-slider=slider]')});
                new ReviewsRotator({el: $('[data-review-rotator]')});
            });

        }

    });