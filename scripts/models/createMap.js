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
    console.log('Google Maps API version: ' + google.maps.version);
    createMap.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.420, lng: -119.700}, // check this
      zoom: 16,
      mapTypeId: 'satellite',
    });

    createMap.infoWindow = new google.maps.InfoWindow({map: createMap.map});
    console.log('infoWindow loading');
    if (navigator.geolocation) {
      console.log('geo local loading');
      navigator.geolocation.getCurrentPosition(function(position) {
        createMap.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('set the center of map');
        createMap.map.setCenter(createMap.pos);
        createMap.infoWindow.setPosition(createMap.pos);
        createMap.infoWindow.setContent('Location Found');
        if(createMap.song){
          createMap.updatePositionSong();
        }
      }, function() {
        createMap.handleLocationError(true, createMap.infoWindow, createMap.map.getCenter());
      });
    } else {
      console.log('Browser doesnt support Geolocation');
      createMap.handleLocationError(false, createMap.infoWindow, createMap.map.getCenter());
    }
  };
  var nowPlaying = 0;
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
      console.log(distance(currLatitude, currLongitude, createMap.allMarkers[1].currLat, createMap.allMarkers[0].currLng, 'M') * 5280);
      if(((distance(currLatitude, currLongitude, createMap.allMarkers[1].currLat, createMap.allMarkers[0].currLng, 'M') * 5280) < 250) && (nowPlaying != 3)){
        console.log(nowPlaying);
        nowPlaying = 3;
        player.playVideoAt(3);
      }
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
