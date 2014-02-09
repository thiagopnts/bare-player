var MediaControl = require('./models/media_control');
var MediaControlView = require('./views/media_control_view');
var VideoSurface = require('./components/video_surface').VideoSurface;
var $ = require('jquery');
window.Backbone = require('backbone')

$(document).ready(function() {
  var surface = new VideoSurface({src: 'samples/video.mp4'});
  var surface2 = new VideoSurface({src: 'samples/video2.mp4'});
  var control = new MediaControl({surface: surface});
  var view = new MediaControlView({model: control});

  control.addSurface(surface2);
  $('body').html(surface.render());
  $('body').append(surface2.render());
  $('body').append(view.render().el);
});


