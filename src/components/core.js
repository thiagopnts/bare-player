/**
 * The Core is responsible to manage Containers, the mediator, MediaControl
 * and the player state.
 */

var MediaControl = require('./media_control');
var Component = require('../base/component');
var VideoContainer = require('./container');
var _ = require('underscore');
var $ = require('jquery');

var PlayerCore = Component.extend({
  events: {
    'click': 'clicked'
  },
  className: 'player',
  initialize: function(args) {
    //var resources = args.resources;
    var resources = ['samples/video1.mp4', 'samples/video1.mp4'];
    this.containers = [];
    for(var i = 0, l = resources.length; i < l; i++) {
      var container = new VideoContainer({src: resources[i]});
      this.listenTo(container, 'container:click', this.containerClicked);
      this.containers.push(container);
    }
    this.mediaControl = new MediaControl({container: this.containers[0]});
  },
  containerClicked: function(container) {
    this.mediaControl.setContainer({container: container, mute: true});
  },
  render: function() {
    this.$el.html();
    var elements = _.each(this.containers, function(container) {
      container.playback.height = 250; //remove it
      this.$el.append(container.render().el);
    }, this);
    this.$el.append(this.mediaControl.render().el)
    return this;
  }
});

module.exports = PlayerCore;
