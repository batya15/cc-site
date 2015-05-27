"use strict";
define(['backbone', './banner.jade'], function(Backbone, template) {

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
                this.$el.addClass('active').show();
            } else {
                this.$el.removeClass('active');
                setTimeout(function() {this.$el.hide();}.bind(this), 300);
            }
        }
    });

});
