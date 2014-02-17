/**
 * The MediaControl is responsible for displaying the Player controls.
 */

var Component = require('../base/component');
var _ = require('underscore');

module.exports = MediaControl = Component.extend({
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'change .seekbar': 'seek'
  },
  className: 'media-control',
  template: _.template('<button class="play">play</button><button class="pause">pause</button><input class="seekbar" type="range" name="seekbar" value="0"/>'),
  initialize: function(args) {
    this.container = args.container;
    this.listenTo(this.container, 'container:timeupdate', this.updateSeekBar);
  },
  play: function() {
    console.log('play');
    this.container.play();
  },
  pause: function() {
    console.log('pause');
    this.container.pause();
  },
  setContainer: function(args) {
    this.stopListening(this.container);
    if(args.mute) {
      this.container.mute();
    }
    this.container = args.container;
    this.container.unmute();
    this.updateSeekBar(this.container.getCurrentTime());
    this.listenTo(this.container, 'container:timeupdate', this.updateSeekBar);
  },
  updateSeekBar: function(time) {
    this.$('.seekbar').val(time);
  },
  seek: function(e) {
    var time = this.container.getDuration() * (this.$('.seekbar').val() / 100);
    this.container.setCurrentTime(time);
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

