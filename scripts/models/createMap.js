(function(module) {

  var createMap = {};

  createMap.map;
  createMap.pos;
  createMap.im = '/img/bluecircle.png';
  createMap.markerCount = 0;
  createMap.allMarkers = [];
  createMap.currMarker = {};
  createMap.marker;
  createMap.x;
  createMap.y;
  createMap.song = true;

  createMap.initMap = function() {
    createMap.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.4201103, lng: -119.7020492}, // check this
      zoom: 16,
      sensor: true
    });

    createMap.infoWindow = new google.maps.InfoWindow({map: createMap.map});

    page('/markers');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        createMap.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        createMap.map.setCenter(createMap.pos);
        if(createMap.song){
          createMap.updatePositionSong();
        }
      }, function() {
        createMap.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      console.log('Browser doesnt support Geolocation');
      createMap.handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  createMap.updatePositionSong = function() {
    navigator.geolocation.watchPosition(function(position) {
      var currLatitude = position.coords.latitude;
      var currLongitude = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      var coords = new google.maps.LatLng(currLatitude, currLongitude);
      console.log('new position');
      if(createMap.currMarker.position){
        createMap.currMarker.setMap(null);
      }
      createMap.currMarker = new google.maps.Marker({
        position: coords,
        map: createMap.map,
        icon: createMap.im
      });

    },function error(msg){alert('Please enable your GPS position future.');

    }, {maximumAge:0, timeout:Infinity, enableHighAccuracy: true});

    google.maps.event.addListener(createMap.map, 'click', function(event) {
      addMarkers.placeMarker(event.latLng);
    });
  };

  createMap.handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
    createMap.infoWindow.setPosition(pos);
    createMap.infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  };

  module.createMap = createMap;
})(window);
