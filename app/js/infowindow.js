(function () {
  'use strict';

  var _ = require('./util');
  var emitter = require('./mediator');
  var template  = require('../templates/detail.jade');

  var visible = false,
      options = {};

  function init() {
    createWindow();
    registerHandlers();
  }

  function createWindow() {
    options.container = _.create('aside', 'info-window-container', document.body);
    options.content = _.create('section', 'info-window-content', options.container);
    options.toggle = _.create('button', 'info-window-toggle', options.container);
    options.toggle.setAttribute('aria-label', 'Close');
  }

  function registerHandlers() {
    document.body.addEventListener('keydown', keydownHandler);
    options.toggle.addEventListener('click', toggle);
    emitter.on('project:click', render);
    emitter.on('infowindow:close', hide);
    emitter.on('zoomtofullextent', hide);
  }

  function keydownHandler(e) {
    // Close the infowindow if the user hits escape
    if (visible && e.keyCode === 27) hide();
  }

  function show() {
    _.addClass(options.container, 'active');
    visible = true;
    emitter.emit('gallery:close', false);
  }

  function hide() {
    _.removeClass(options.container, 'active');
    visible = false;
  }

  function toggle() {
    visible ? hide() : show(); //jshint ignore:line
  }

  function render(project) {
    options.content.innerHTML = template({ project: project.properties });
    show();
  }

  module.exports.init = init;
  module.exports.show = show;
  module.exports.hide = hide;
  module.exports.toggle = toggle;
})();
