var Player = require('../player');
var $ = require('jquery');
var mediator = require('../mediator');

module.exports.VideoMedia = VideoMedia = Player.Media.extend({
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
    console.log('updating');
    this.playback.currentTime = time;
  }
});

module.exports.VideoSurfaceView = VideoSurfaceView = Player.Surface.extend({
  events: {
    'click' : 'showInfo',
    'timeupdate': 'timeUpdated'
  },
  tagName: 'video',
  showInfo: function() {
    console.log('surface ' + this.model.cid);
  },
  timeUpdated: function() {
    var time = (100 / this.model.getDuration()) * this.model.getCurrentTime();
    mediator.trigger('timeupdate:' + this.cid, time);
  },
  render: function() {
    this.el.height = 420;
    this.model.setPlayback(this.el);
    return this;
  }
});

module.exports.VideoSurface = VideoSurface = function(args) {
  this.media = new VideoMedia({src: args.src || 'samples/video.mp4'});
  this.surface = new VideoSurfaceView({model: this.media});
  this.el = this.surface.el;
};

VideoSurface.prototype = {
  getId: function() {
    return this.surface.cid;
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
    return this.surface.el;
  }
}


