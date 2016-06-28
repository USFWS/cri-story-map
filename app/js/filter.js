(function () {
  'use strict';

  var _ = require('./util');
  var emitter = require('./mediator');
  var template = require('../templates/filter.jade');

  var options = {};

  function init() {
    createWindow();
    registerHandlers();
    render();
  }

  function createWindow() {
    options.container = _.create('aside', 'filter-container', document.body);
    options.content = _.create('section', 'filter-content', options.container);
    options.toggle = _.create('button', 'filter-toggle', options.container);
    options.toggle.setAttribute('aria-label', 'Close');
  }

  function registerHandlers() {
    document.body.addEventListener('keydown', keydownHandler);
    options.toggle.addEventListener('click', toggle);
    // emitter.on('project:click', render);
    emitter.on('filter:close', hide);
  }

  // Close the infowindow if the user hits escape
  function keydownHandler(e) {
    if (options.visible && e.keyCode === 27) hide();
  }

  function show() {
    _.addClass(options.container, 'active');
    options.visible = true;
    emitter.emit('infowindow:close', false);
  }

  function hide() {
    _.removeClass(options.container, 'active');
    options.visible = false;
  }

  function toggle() {
    options.visible ? hide() : show(); //jshint ignore:line
  }

  function render() {
    options.content.innerHTML = template();
  }

  module.exports.init = init;
})();
