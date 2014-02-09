var MediaControl = require('./models/media_control');
var WMPPlayer = require('./models/player');
var VideoSurface = require('./components/video_surface');
var $ = require('jquery');
window.Backbone = require('backbone')

$(document).ready(function() {
  var surface = new VideoSurface({src: 'samples/video.mp4'});
  var surface2 = new VideoSurface({src: 'samples/video2.mp4'});
  surface2.$el.addClass('pip');

  var mediaControl = new MediaControl({surfaces: [surface, surface2]});
  var player = new WMPPlayer({mediaControl: mediaControl});

  $('body').html(player.render().el);
});


