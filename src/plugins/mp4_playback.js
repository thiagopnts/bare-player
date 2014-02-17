var PlaybackPlugin = require('../base/playback_plugin');

var MP4Playback = PlaybackPlugin.extend({
  events: {
    'timeupdate': 'timeUpdated',
    'ended': 'ended'
  },
  tagName: 'video',
  className: 'container',
  initialize: function(args) {
    this.container = args.container;
    this.el.src = args.src;
    this.playback = this.el;
    this.playback.height = 250;

    this.listenTo(this.container, 'container:play', this.play);
    this.listenTo(this.container, 'container:pause', this.pause);
    this.listenTo(this.container, 'container:seek', this.seek);
    this.listenTo(this.container, 'container:fullscreen', this.fullscreen);
    this.render(); // it should render when the container trigger 'ready'
  },
  play: function() {
    this.playback.play();
  },
  pause: function() {
    this.playback.pause();
  },
  fullscreen: function() {
    this.el.webkitRequestFullscreen();
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
  seek: function(seekBarValue) {
    var time = this.playback.duration * (seekBarValue / 100);
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
    this.container.timeUpdated(time);
  },
  render: function() {
    this.container.$el.append(this.el);
    return this;
  }
});

module.exports = MP4Playback;

