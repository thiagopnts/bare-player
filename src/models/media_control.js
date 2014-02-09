var Player = require('../player');
var DefaultMediaControlView = require('../views/default_media_control_view');
var _      = require('underscore');

var DefaultMediaControl = Player.Model.extend({
  initialize: function(args) {
    this.surfaces = args.surfaces;
    this.currentSurface = 0;
    this.surface = this.surfaces[0];
  },
  addSurface: function(surface) {
    this.surfaces.push(surface);
  },
  play: function() {
    if(this._isPaused()) {
      this.surface.media.play();
    }
  },
  pause: function() {
    if(!this._isPaused()) {
      this.surface.media.pause();
    }
  },
  swap: function() {
    this.surface = this.surfaces[++this.currentSurface % this.surfaces.length];
  },
  _isPaused: function() {
    return this.surface.media.isPaused();
  },
  getCurrentSurface: function() {
    return this.surface;
  },
  setCurrentSurface: function(surface) {
    this.surface = surface;
  }
});

var MediaControl = function(args) {
  this.model = args.model || new DefaultMediaControl({surfaces: args.surfaces});
  this.view = args.view || new DefaultMediaControlView({model: this.model, surfaces: args.surfaces});
  this.el = this.view.el;
  this.listenTo(this.view, 'swap', this.proxy);
};


MediaControl.prototype = {
  proxy: function(previousSurface) {
    this.trigger('swap', previousSurface);
  },
  getCurrentSurface: function() {
    return this.model.getCurrentSurface();
  },
  getSurfaces: function() {
    return this.model.surfaces;
  },
  render: function() {
    this.view.render();
    return this.view;
  }
};

_.extend(MediaControl.prototype, Player.Events);

module.exports = MediaControl;
