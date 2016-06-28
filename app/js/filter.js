(function () {
  'use strict';

  var _ = require('./util');
  var emitter = require('./mediator');
  var template = require('../templates/filter.jade');

  var filter = {
    region: require('./filter/region'),
    state: require('./filter/state'),
    year: require('./filter/year')
  };

  var options = {};

  function init(opts) {
    options = opts;
    createWindow();
    render();
    options.form = document.querySelector('.filter-form');
    options.reset = document.querySelector('.reset-button');
    registerHandlers();
  }

  function createWindow() {
    options.container = _.create('aside', 'filter-container', document.body);
    if (options.visible) _.addClass(options.container, 'active');
    options.content = _.create('section', 'filter-content', options.container);
    options.toggle = _.create('button', 'filter-toggle', options.container);
    options.toggle.setAttribute('aria-label', 'Close');
  }

  function registerHandlers() {
    document.body.addEventListener('keydown', keydownHandler);
    options.reset.addEventListener('click', resetMarkers);
    options.toggle.addEventListener('click', toggle);
    emitter.on('filter:close', hide);
    emitter.on('projects:loaded', setUpFilter);
    emitter.on('project:click', hide);
    options.form.addEventListener('submit', query);
  }

  function setUpFilter(projects) {
    options.projects = projects;
    options.selectRegion = options.form.querySelector('#select-a-region');
    options.selectYear = options.form.querySelector('#select-a-year');
    addOptions(options.selectRegion, filter.region.picklist(options.projects.features).sort());
    addOptions(options.selectYear, filter.year.picklist(options.projects.features).sort());
  }

  function addOptions(select, list) {
    list.forEach(function (item) {
      select.options[select.options.length] = new Option(item, item);
    });
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

  function resetMarkers() {
    emitter.emit('reset:markers', options.projects);
    options.selectRegion.value = options.selectRegion[0];
    options.selectYear.value = options.selectYear[0];
  }

  function query(e) {
    e.preventDefault();
    var geojson = _.clone(options.projects);
    var filtered = [];
    var filteredByRegion = [];
    var filteredByYear = [];

    if (options.selectRegion.value !== '') {
      filteredByRegion = options.projects.features.filter(function (project) {
        return project.properties.region === options.selectRegion.value;
      });
    }

    geojson.features = _.union(filteredByRegion);

    if (options.selectYear.value !== '') {
      filteredByYear = options.projects.features.filter(function (project) {
        return project.properties.year === options.selectYear.value;
      });
      geojson.features = _.intersection(geojson.features, filteredByYear);
    }

    emitter.emit('filtered:projects', geojson);
  }

  module.exports.init = init;
})();
