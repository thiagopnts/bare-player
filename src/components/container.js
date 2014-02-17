/**
 * Container is responsible for the video rendering and state
 */

var Component = require('../base/component');

var VideoContainer = Component.extend({
  events: {
    'click': 'showInfo',
    'timeupdate': 'timeUpdated',
    'ended': 'ended'
  },
  tagName: 'video',
  className: 'container',
  initialize: function(args) {
    this.el.src = args.src;
    this.playback = this.el;
  },
  play: function() {
    this.playback.play();
  },
  pause: function() {
    this.playback.pause();
  },
  mute: function() {
    this.playback.volume = 0;
  },
  unmute: function() {
    this.playback.volume = 1;
  },
  isMuted: function() {
    return !!this.playback.volume
  },
  ended: function() {
    this.trigger('container:timeupdate', 0);
  },
  showInfo: function() {
    this.trigger('container:click', this);
    console.log('container ' + this.cid);
  },
  setCurrentTime: function(time) {
    this.playback.currentTime = time;
  },
  getCurrentTime: function() {
    return this.playback.currentTime;
  },
  getDuration: function() {
    return this.playback.duration;
  },
  timeUpdated: function() {
    var time = (100 / this.playback.duration) * this.playback.currentTime;
    this.trigger('container:timeupdate', time);
  },
  render: function() {
    return this;
  }
});

module.exports = VideoContainer;
