(function () {
  'use strict';

  var xhr = require('xhr');
  var emitter = require('./mediator');
  var _ = require('./util');

  var projects;

  function init(path) {
    xhr.get(path, function (err, res) {
      projects = JSON.parse(res.body);
      emitter.emit('projects:loaded', projects);
    });
  }

  function getProjects() {
    return projects;
  }

  function getProject(projectName) {
    return _.find(projects.features, function (project) {
      return project.properties.name.toLowerCase() === projectName.toLowerCase();
    });
  }

  exports.getProjects = getProjects;
  exports.getProject = getProject;
  exports.init = init;

})();
