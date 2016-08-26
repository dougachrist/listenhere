getLatLng = function(zipCode) {
  var googleURL = '/theGoogles/' + 'maps/api/geocode/json?address=' + zipCode;
  $.ajax({
    url:  googleURL,
    method: 'POST',
    success: function(data){
      console.log(data);
      // var results = data.results;
      // var geoResult = results[0];
      // homeModel.zipResults.push(geoResult.geometry.location.lat);
      // homeModel.zipResults.push(geoResult.geometry.location.lng);
    }
  });
};
