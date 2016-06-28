(function () {
  'use strict';

  require('classlist-polyfill');

  function create(tagName, className, container) {
    var el = document.createElement(tagName);
    el.className = className;
    if (container) container.appendChild(el);

    return el;
  }

  function remove(el) {
    var parent = el.parentNode;
    if (parent) parent.removeChild(el);
  }

  function addClass(el, name) {
    el.classList.add(name);
  }

  function removeClass(el, name) {
    el.classList.remove(name);
  }

  function toggleClass(el, name) {
    el.classList.toggle(name);
  }

  module.exports = {
    defaults: require('lodash.defaults'),
    find: require('lodash.find'),
    slugify: require('underscore.string/slugify'),
    random: require('lodash.sample'),
    union: require('lodash.union'),
    intersection: require('lodash.intersection'),
    clone: require('lodash.clone'),
    create: create,
    remove: remove,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass
  };

})();
