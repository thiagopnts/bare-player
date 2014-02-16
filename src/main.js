var MediaControl = require('./components/media_control');
var PlayerCore = require('./components/core');
var $ = require('jquery');

module.exports = WP3 = {
  MediaControl: MediaControl
};

$(document).ready(function() {
  var core = new PlayerCore();
  $('body').html(core.render().el);
});
