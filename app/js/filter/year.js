(function () {
  'use strict';

  // Return complete list of Regions given a list of projects
  function picklist(projects) {
    var picklist = [];
    var props;

    projects.forEach(function (project) {
      props = project.properties;
      if ( picklist.indexOf(props.year) === -1 ) picklist.push(props.year);
    });

    return picklist;
  }

  module.exports.picklist = picklist;
})();
