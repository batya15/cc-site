"use strict";

define(['backbone', './banner'], function(Backbone, Banner) {

    var $ = Backbone.$;

    var Collection = Backbone.Collection.extend({
        setActive: function(id) {
            this.each(function(m) {
                m.set({
                    active: (m.id === id)
                });
            }, this);
        },
        nextActive: function() {
            var index;
            this.each(function (m, i) {
                if (m.get('active')) {
                   index = i;
                }
            }, this);
            index = (typeof index != 'number')? -1: index;
            index = (index >= this.models.length -1)? -1: index;
            this.setActive(this.models[index+1].id);
        },
        model: Backbone.Model.extend({
            idAttribute: "ns"
        })
    });

    return Backbone.View.extend({
        events: {
            'mouseover [data-ns]': 'mouseOver',
            'mouseout [data-ns]': 'mouseOut',
            'mouseenter': 'stopTimer',
            'mouseleave': 'startTimer'
        },
        initialize: function(data) {
            this.collection = new Collection();
            this.listenTo(this.collection, 'change:active', this.active);
            if (!data.el.length) {
                this.remove();
                return;
            }
            this.setElement(data.el);
            this.$('[data-ns]').each(this.addBanner.bind(this));
            this.collection.each(this.initBanner, this);
            this.collection.nextActive();
            this.startTimer();
        },
        addBanner: function (index, el) {
            var data = $(el).data();
            this.collection.add(data);
        },
        initBanner: function (m) {
            var v = new Banner({model: m});
            this.$('.wrapper').append(v.$el);
        },
        mouseOut: function() {
            clearTimeout(this.timerTrigger);
        },
        mouseOver: function(e) {
            var id = $(e.currentTarget).data('ns');
            this.timerTrigger = setTimeout(function() {
                console.log(id);
                this.collection.setActive(id);
            }.bind(this), 500);
        },
        active: function(m) {
            if (m.get('active')) {
                this.$('.menu')
                    .removeClass()
                    .addClass('menu ' + m.id);
            }
            this.$('[data-ns = ' + m.id + ']')
                .removeClass('bold')
                .addClass(function () {
                    return (m.get('active'))? 'bold': '';
                });
        },
        startTimer: function() {
            this.timer = setTimeout(function () {
                this.collection.nextActive();
                this.startTimer();
            }.bind(this), 6000);
        },
        stopTimer: function() {
            clearTimeout(this.timer);
        }
    });

});