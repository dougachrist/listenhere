(function(module) {

  var createMap = {};

  createMap.map;
  createMap.pos;
  createMap.im = '/img/bluecircle.png';
  createMap.markerCount = 0;
  createMap.allMarkers = [];
  createMap.rankingArray = [];
  createMap.NextSongDistance;
  createMap.currMarker = {};
  createMap.marker;
  createMap.x;
  createMap.y;
  createMap.song = true;
  createMap.NextSongIndex;

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
  var nowPlayingSongIndex = 0;
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
      createMap.updateDistanceToMarkers(currLatitude, currLongitude);
      if( (nowPlayingSongIndex !== createMap.NextSongIndex) && (createMap.NextSongDistance < 250) ){
        console.log('now Playing ' + (createMap.NextSongIndex + 1));
        nowPlayingSongIndex = createMap.NextSongIndex;
        player.playVideoAt(nowPlayingSongIndex);
      }
    },function error(msg){alert('Please enable your GPS position future.');

    }, {maximumAge:0, timeout:Infinity, enableHighAccuracy: true});

    google.maps.event.addListener(createMap.map, 'click', function(event) {
      addMarkers.placeMarker(event.latLng);
    });
  };

  createMap.updateDistanceToMarkers = function(currLatitude, currLongitude) {
    createMap.allMarkers.forEach(function(element,index){
      element.distanceTo = distance(currLatitude, currLongitude, element.currLat, element.currLng, 'M') * 5280;
      createMap.rankingArray.push(element.distanceTo);
    });
    console.log(createMap.rankingArray);
    var lowest = 0;
    for (var i = 1; i < createMap.rankingArray.length; i++) {
      if(createMap.rankingArray[i] < createMap.rankingArray[lowest]){
        lowest = i;
      }
    }
    createMap.NextSongDistance = createMap.rankingArray[lowest];
    createMap.NextSongIndex = lowest;
    createMap.rankingArray = [];
  };

  createMap.handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
    createMap.infoWindow.setPosition(pos);
    createMap.infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  };

  module.createMap = createMap;
})(window);
