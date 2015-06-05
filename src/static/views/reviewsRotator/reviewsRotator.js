"use strict";

define(['backbone'], function(Backbone) {

    return Backbone.View.extend({
        events: {
            'click [data-next]': 'next',
            'click [data-prev]': 'prev'
        },
        initialize: function(data) {
            if (!data.el.length) {
                this.remove();
                return false;
            }
            var wContainer = this.$('[data-cnt]').width(),
            wTape = this.$('[data-tape]').width();

            this.step = Math.floor(wContainer/3);
            this.minLeft = wContainer - wTape;
            this.position = 0;
            this.pos();
        },
        next: function() {
            this.position = this.position - this.step*2;
            this.pos();
        },
        prev: function() {
            this.position = this.position + this.step*2;
            this.pos();
        },
        pos: function () {
            this.$('[data-tape]').css({left: this.position});
            if (this.position > 0) {
                this.position = 0;
                setTimeout(this.pos.bind(this), 200);
            } else if (this.position < this.minLeft) {
                this.position = this.minLeft;
                setTimeout(this.pos.bind(this), 200);
            }
        }
    });

});