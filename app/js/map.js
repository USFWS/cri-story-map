(function () {
  'use strict';

  var L = require('leaflet');
  require('leaflet.markercluster');
  var _ = require('./util');
  var emitter = require('./mediator');

  L.Icon.Default.imagePath = './images';

  var map, options, cluster;
  var defaults = {
    zoom: 5,
    element: 'map'
  };

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    createMap();
    createZoomToFullExtent();
    addBasemap();
    registerHandlers();
    if (options.data) addLayers();
  }

  function registerHandlers() {
    options.fullExtent.addEventListener('click', zoomToFullExtent);
    emitter.on('project:click', makeRoomForInfoWindow);
    emitter.on('filtered:projects', filter);
    emitter.on('reset:markers', reset);
  }

  function destroy() {
    options.fullExtent.removeEventListener('click', zoomToFullExtent);
    emitter.off('project:click', makeRoomForInfoWindow);
    emitter.off('filtered:projects', filter);
  }

  function createMap() {
    map = L.map(options.element, {
      center: options.center,
      zoom: options.zoom
    });
  }

  function createZoomToFullExtent() {
    options.fullExtent = _.create('button', 'zoom-to-full-extent', document.body);
    options.fullExtent.setAttribute('title', 'Zoom to full extent');
    options.imgExtent = _.create('img', 'full-extent-img', options.fullExtent);
    options.imgExtent.setAttribute('src', './images/full-extent.svg');

  }

  function addBasemap() {
    L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png').addTo(map);
  }

  function addLayers() {
    cluster = L.markerClusterGroup({
      showCoverageOnHover: false
    });

    options.markers = L.geoJson(options.data, {
      onEachFeature: onEachFeature
    });
    options.fullExtent = options.markers.getBounds();

    cluster.addLayer(options.markers).addTo(map);
    map.fitBounds(cluster.getBounds(), { paddingBottomRight: [0, 300]});
  }

  function onEachFeature(feature, layer) {
    layer.on({ click: onMarkerClick });
  }

  function onMarkerClick(e) {
    emitter.emit('project:click', e.target.feature);
  }

  // Decide if we should make room on the map for the infowindow
  function makeRoomForInfoWindow(office) {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth > 1000) flyToOffice(office);
    else flyToOffice(office, 11, 0);
  }

  function flyToOffice(office, zoom, padding) {
    var zoom = zoom || 10;
    var padding = padding || 0.135;
    // Clone the coordinates array
    var latlng = office.geometry.coordinates.slice(0).reverse();
    // Account for detail panel opening
    latlng[1] = latlng[1] + padding;
    map.flyTo(latlng, zoom, { duration: 2 });
  }

  function zoomToFullExtent() {
    reset(options.data);
  }

  function filter(projects) {
    cluster.clearLayers();
    options.markers = L.geoJson(projects, {
      onEachFeature: onEachFeature
    });

    cluster.addLayer(options.markers);
    map.flyToBounds(cluster.getBounds());
  }

  function reset(projects) {
    projects = projects || options.data;
    cluster.clearLayers();
    options.markers = L.geoJson(projects, {
      onEachFeature: onEachFeature
    });

    cluster.addLayer(options.markers);
    map.flyToBounds(cluster.getBounds());
    emitter.emit('zoomtofullextent');
  }

  module.exports.init = init;
  module.exports.destroy = destroy;
})();
