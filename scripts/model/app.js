var map;
var pos;
var im = '/img/bluecircle.png';
var markerCount = 0;
var allMarkers = [];
var currMarker = {};
var marker;
var x;
var y;
var song = true;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.4201103, lng: -119.7020492},
    zoom: 16
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  console.log(navigator.geolocation.getCurrentPosition);

// Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
// Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
  }

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var currLatitude = position.coords.latitude;
      var currLongitude = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      var coords = new google.maps.LatLng(currLatitude, currLongitude);
      console.log('new position');
      if(currMarker.position){
        currMarker.setMap(null);
      }
      currMarker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: im
      });

      if(allMarkers[0]) {
        x = distance(currMarker.position.lat(), currMarker.position.lng(), allMarkers[0].position.lat(), allMarkers[0].position.lng());
      }

      if(allMarkers[1]) {
        y = distance(currMarker.position.lat(), currMarker.position.lng(), allMarkers[1].position.lat(), allMarkers[1].position.lng());
      }

      if(allMarkers[0] && allMarkers[1] && song) {
        if (x < y) {
          song = false;
          $('iframe').attr('src', 'https://www.youtube.com/embed/J9HKqYP0c-8?autoplay=1');
        } else {
          song = false;
          $('iframe').attr('src', 'https://www.youtube.com/embed/J9HKqYP0c-8?autoplay=1');
        }
      }

    },function error(msg){alert('Please enable your GPS position future.');

    }, {maximumAge:0, timeout:Infinity, enableHighAccuracy: true});
  }

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    if(markerCount < 2){
      markerCount++;
      marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        title: 'song ' + markerCount,
        store_id: markerCount,
        currLat: location.lat(),
        currLng: location.lng()
      });
      allMarkers.push(marker);
      marker.setMap(map);
    } else {
      alert('too many markers, please remove one');
    }
  }
}

$('#getButton').on('click', calculateDiff);

function calculateDiff() {
  console.log(currMarker.position.lat());
  console.log(currMarker.position.lng());
  console.log(allMarkers[0].position.lat());
  console.log(allMarkers[0].position.lng());

  console.log(distance(currMarker.position.lat(), currMarker.position.lng(), allMarkers[0].position.lat(), allMarkers[0].position.lng()));

  if(distance(currMarker.position.lat(), currMarker.position.lng(), allMarkers[0].position.lat(), allMarkers[0].position.lng()) < .3){
    $('iframe').attr('src', 'https://www.youtube.com/embed/J9HKqYP0c-8?autoplay=1');
  }
}
