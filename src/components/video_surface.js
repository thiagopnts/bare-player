var Player = require('../player');
var $ = require('jquery');
var mediator = require('../mediator');

var VideoMedia = Player.Media.extend({
  initialize: function(args) {
    this.src = args.src;
  },
  setPlayback: function(playback) {
    this.playback = playback;
    this.playback.src = this.src;
  },
  play: function() {
    console.log('surface ' + this.cid + ' is playing');
    this.playback.play();
  },
  pause: function() {
    console.log('surface ' + this.cid + ' is paused');
    this.playback.pause();
  },
  isPaused: function() {
    return this.playback.paused;
  },
  getDuration: function() {
    return this.playback.duration;
  },
  getCurrentTime: function() {
    return this.playback.currentTime;
  },
  setCurrentTime: function(time) {
    this.playback.currentTime = time;
  }
});

module.exports.VideoSurfaceView = VideoSurfaceView = Player.Surface.extend({
  events: {
    'click' : 'showInfo',
    'timeupdate': 'timeUpdated'
  },
  tagName: 'video',
  className: 'surface',
  showInfo: function() {
    console.log('surface ' + this.model.cid);
  },
  timeUpdated: function() {
    var time = (100 / this.model.getDuration()) * this.model.getCurrentTime();
    this.trigger('timeupdate', time);
  },
  render: function() {
    this.el.height = 420;
    this.model.setPlayback(this.el);
    return this;
  }
});

var VideoSurface = function(args) {
  this.media = new VideoMedia({src: args.src || 'samples/video.mp4'});
  this.surface = new VideoSurfaceView({model: this.media});
  this.listenTo(this.surface, 'timeupdate', this.proxy);
  this.el = this.surface.el;
  this.$el = this.surface.$el;
};

VideoSurface.prototype = {
  proxy: function(time) {
    this.trigger('timeupdate', time);
  },
  getId: function() {
    return this.surface.cid;
  },
  hide: function() {
    this.$el.hide();
  },
  show: function() {
    this.$el.show();
  }, 
  getDuration: function() {
    return this.media.getDuration();
  },
  getCurrentTime: function() {
    return this.media.getCurrentTime();
  },
  setCurrentTime: function(time) {
    this.media.setCurrentTime(time);
  },
  render: function() {
    this.surface.render();
    return this.surface;
  }
}

_.extend(VideoSurface.prototype, Player.Events);

module.exports = VideoSurface;
