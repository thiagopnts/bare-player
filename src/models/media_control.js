var Player = require('../player');

module.exports = Player.Model.extend({
  initialize: function(args) {
    this.surface = args.surface;
    this.currentSurface = 0;
    this.surfaces = [this.surface];
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
