var map;
var pos;
var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
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
      console.log('what');
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

  // var drawingManager = new google.maps.drawing.DrawingManager({
  //   drawingMode: google.maps.drawing.OverlayType.MARKER,
  //   drawingControl: true,
  //   drawingControlOptions: {
  //     position: google.maps.ControlPosition.TOP_CENTER,
  //     drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
  //   },
  //   markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
  //   circleOptions: {
  //     fillColor: '#ffff00',
  //     fillOpacity: 1,
  //     strokeWeight: 5,
  //     clickable: false,
  //     editable: true,
  //     zIndex: 1
  //   }
  // });
  // drawingManager.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var currLatitude = position.coords.latitude;
      var currLongitude = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      var coords = new google.maps.LatLng(currLatitude, currLongitude);

      var marker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: im
      });
    },function error(msg){alert('Please enable your GPS position future.');

    }, {maximumAge:0, timeout:Infinity, enableHighAccuracy: false});

  }

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(34.8848, -119.602),
    map: map,
    title: 'song #1',
    animation: google.maps.Animation.DROP,
    draggable: true
  });

  // var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var userMarker = new google.maps.Marker({
    position: new google.maps.LatLng(34.8848, -119.502),
    map: map,
    icon: im
  });

  marker.setMap(map);
}
