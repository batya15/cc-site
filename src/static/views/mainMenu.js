"use strict";
define(['backbone'], function(Backbone) {

    var $ = Backbone.$;

    return Backbone.View.extend({
        events: {
            'mouseover [data-id=mainItem]': 'mouseOver',
            'mouseout [data-id=mainItem]': 'mouseOut'
        },
        initialize: function(data) {
            this.setElement(data.el);
        },
        mouseOver: function(e) {
            $(e.currentTarget).addClass('hover');
        },
        mouseOut: function(e) {
            $(e.currentTarget).removeClass('hover');
        }
    });

});
