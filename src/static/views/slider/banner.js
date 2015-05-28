"use strict";
define(['backbone', 'underscore','./banner.jade'], function(Backbone, _, template) {

    return Backbone.View.extend({
        attributes: {
            class: 'v-bnr'
        },
        initialize: function() {
            this.listenTo(this.model, 'change:active', this.active);
            this.render();
        },
        render: function() {
            this.$el.html(template(this.model.attributes));
        },
        active: function() {
            if (this.model.get('active')) {
                this.$el.show();
                _.defer(function () {
                    this.$el.addClass('active');
                }.bind(this));
            } else {
                this.$el.removeClass('active');
                setTimeout(function() {this.$el.hide();}.bind(this), 300);
            }
        }
    });

});
