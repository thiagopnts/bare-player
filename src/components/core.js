/**
 * The Core is responsible to manage Containers, the mediator, MediaControl
 * and the player state.
 */

var MediaControl = require('./media_control');
var Component = require('../base/component');
var Container = require('./container');
var MP4Playback = require('../plugins/mp4_playback');
var _ = require('underscore');
var $ = require('jquery');

var PlayerCore = Component.extend({
  className: 'player',
  initialize: function(args) {
    //var resources = args.resources;
    //does this kind of info comes from playback handler?
    var resources = ['samples/video1.mp4', 'samples/video1.mp4'];
    this.containers = [];
    for(var i = 0, l = resources.length; i < l; i++) {
      var container = new Container();
      var playback = new MP4Playback({container: container, src: resources[i]});
      this.listenTo(container, 'container:click', this.containerClicked);
      this.containers.push(container);
    }
    this.mediaControl = new MediaControl({container: this.containers[0]});
    this.listenTo(this.mediaControl, 'mediacontrol:fullscreen', this.requestFullscreen);
  },
  containerClicked: function(container) {
    this.mediaControl.setContainer(container);
  },
  requestFullscreen: function() {
    this.el.webkitRequestFullscreen();
    this.$el.css({height: '100%', width: '100%'});
  },
  render: function() {
    this.$el.html();
    var elements = _.each(this.containers, function(container) {
      //container.playback.height = 250; //remove it
      this.$el.append(container.render().el);
      console.log(container.el);
    }, this);
    this.$el.append(this.mediaControl.render().el)
    return this;
  }
});

module.exports = PlayerCore;
