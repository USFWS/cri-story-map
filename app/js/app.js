(function () {
  'use strict';

  var map = require('./map');
  var infoWindow = require('./infowindow');
  var about = require('./about');
  var data = require('./data-access');
  var filter = require('./filter');
  var emitter = require('./mediator');

  var projects;

  data.init('./data/projects.js');

  infoWindow.init();
  about.init();
  filter.init({
    visible: true
  });

  emitter.on('projects:loaded', function (projectData) {
    projects = projectData;

    map.init({
      element: 'map',
      center: [37.174019, -82.604078],
      data: projects
    });

  });

})();
