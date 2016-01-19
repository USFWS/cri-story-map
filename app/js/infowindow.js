(function () {
  'use strict';
  var dom = require('./util').dom;
  var emitter = require('./mediator');
  var template  = require('../templates/detail.jade');

  var visible = false,
      options = {};

  function init() {
    createWindow();
    registerHandlers();
  }

  function createWindow() {
    options.container = dom.create('aside', 'info-window-container', document.body);
    options.content = dom.create('section', 'info-window-content', options.container);
    options.toggle = dom.create('button', 'info-window-toggle', options.container);
    options.toggle.innerHTML = '&#9668;';
  }

  function registerHandlers() {
    options.toggle.addEventListener('click', toggle);
    emitter.on('project:click', render);
  }

  function show() {
    options.toggle.innerHTML = '&#9658;';
    dom.addClass(options.container, 'active');
    visible = true;
  }

  function hide() {
    options.toggle.innerHTML = '&#9668;';
    dom.removeClass(options.container, 'active');
    visible = false;
  }

  function toggle() {
    visible ? hide() : show();
  }

  function render(project) {
    options.content.innerHTML = template({ project: project });
    show();
  }

  module.exports.init = init;
  module.exports.show = show;
  module.exports.hide = hide;
  module.exports.toggle = toggle;
})();
