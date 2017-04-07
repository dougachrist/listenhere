(function(module) {

  var addMarkers = {};

  addMarkers.placeMarker = function(location) {
    if(createMap.markerCount < songsArray.length){
      createMap.marker = new google.maps.Marker({
        position: location,
        map: createMap.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        snippet: 'this is a snip',
        title: songsArray[createMap.markerCount],
        label: (createMap.markerCount + 1).toString(),
        store_id: createMap.markerCount,
        currLat: location.lat(),
        currLng: location.lng()
      });
      createMap.allMarkers.push(createMap.marker);
      createMap.marker.setMap(createMap.map);
      createMap.marker.addListener('click', function(event){
        console.log(this.title);
      });
      createMap.markerCount++;
    } else {
      alert('too many markers, please remove one');
    }
  };

  module.addMarkers = addMarkers;
})(window);
