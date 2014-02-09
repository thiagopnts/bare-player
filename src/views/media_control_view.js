var Player = require('../player');
var mediator = require('../mediator');
var template = require('../templates/media_control.hbs');

module.exports = Player.View.extend({
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .swap': 'swap',
    'change .seekbar': 'seek'
  },
  initialize: function() {
    //TODO: MediaControl must watch ONLY the the timeupdate events from the current surface
    mediator.on('timeupdate:' + this.model.getCurrentSurface().getId(), this.updateBar, this);
  },
  template: template,
  play: function() {
    this.model.play();
  },
  pause: function() {
    this.model.pause();
  },
  swap: function() {
    mediator.off('timeupdate:' + this.model.getCurrentSurface().getId(), this.updateBar, this);
    this.model.swap();
    mediator.on('timeupdate:' + this.model.getCurrentSurface().getId(), this.updateBar, this);
  },
  seek: function(e) {
    console.log('MediaControl#change');
    var time = this.model.getCurrentSurface().getDuration() * (this.$(e.target).val() / 100);
    console.log('should seek to ' + time);
    //seek only works if the current server supports byte range requests.
    this.model.getCurrentSurface().setCurrentTime(time);
  },
  updateBar: function(time) {
    this.$('.seekbar').val(time);
  },

  render: function() {
    this.$el.html(this.template({duration: this.model.getCurrentSurface().getDuration()}));
    return this;
  }
});
