(function(module) {

  var addMarkers = {};

  // $('#getButton').on('click', createMap.updatePositionSong);

  addMarkers.placeMarker = function(location) {
    if(createMap.markerCount < 2){
      createMap.markerCount++;
      createMap.marker = new google.maps.Marker({
        position: location,
        map: createMap.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        title: 'song ' + createMap.markerCount,
        store_id: createMap.markerCount,
        currLat: location.lat(),
        currLng: location.lng()
      });
      createMap.allMarkers.push(createMap.marker);
      createMap.marker.setMap(createMap.map);
    } else {
      alert('too many markers, please remove one');
    }
  };

  module.addMarkers = addMarkers;
})(window);
