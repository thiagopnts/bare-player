var Player = require('../player');
var _        = require('underscore');
var mediator = require('../mediator');
var template = require('../templates/media_control.hbs');

module.exports = Player.View.extend({
  className: 'media-control',
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .swap': 'swap',
    'change .seekbar': 'seek'
  },
  initialize: function(args) {
    //remove surfaces from here it's not used anymore.
    //the media control should not render it, it's not its responsability.
    this.listenTo(this.model.getCurrentSurface(), 'timeupdate', this.updateBar);
  },
  template: template,
  play: function() {
    this.model.play();
  },
  pause: function() {
    this.model.pause();
  },
  swap: function() {
    //say everyone which surface is leaving
    this.trigger('swap', this.model.getCurrentSurface());
    this.stopListening(this.model.getCurrentSurface());
    this.model.swap();
    this.listenTo(this.model.getCurrentSurface(), 'timeupdate', this.updateBar);
  },
  seek: function(e) {
    var time = this.model.getCurrentSurface().getDuration() * (this.$(e.target).val() / 100);
    //seek only works if the current server supports byte range requests.
    this.model.getCurrentSurface().setCurrentTime(time);
  },
  updateBar: function(time) {
    this.$('.seekbar').val(time);
  },

  render: function() {
    this.$el.html(this.template());
    //this.$el.prepend(this.model.getCurrentSurface().el);
    return this;
  }
});
