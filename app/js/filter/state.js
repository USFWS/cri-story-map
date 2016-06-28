(function () {
  'use strict';

  // Return complete list of Regions given a list of projects
  function picklist(projects) {
    var picklist = [];
    var props;

    projects.forEach(function (project) {
      project.properties.states.forEach(function (state) {
        if ( picklist.indexOf(state) === -1 ) picklist.push(state);
      });
    });

    return picklist;
  }

  module.exports.picklist = picklist;
})();
