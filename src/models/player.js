var Player = require('../player');
var mediator = require('../mediator');
var _ = require('underscore');

var WMPPlayer = Player.View.extend({
  className: 'player-container',
  initialize: function(args) {
    //maybe the player must receive all surfaces and pass it to media control, instead the inverse.
    this.mediaControl = args.mediaControl;
    this.mediaControl.render();
    this.listenTo(this.mediaControl, 'swap', this.swap);
  },
  initializeSurfaces: function(surface) {
    surface.render();
    return surface.el
  },
  swap: function(previousSurface) {
    previousSurface.hide();
    this.mediaControl.getCurrentSurface().show();
  },
  render: function() {
    var elements = _.map(this.mediaControl.getSurfaces(), this.initializeSurfaces, this);
    this.$el.html(elements);
    this.mediaControl.getCurrentSurface().show();
    this.$el.append(this.mediaControl.el);
    return this;
  }
});

module.exports = WMPPlayer;
