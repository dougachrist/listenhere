getLatLng = function(zipCode) {
  var googleURL = '/theGoogles/' + 'maps/api/geocode/json?address=' + zipCode;
  $.ajax({
    url:  googleURL,
    method: 'POST',
    success: function(data){
      console.log('google api data', data);
    }
  });
};

getYT = function(){
  $.getJSON('https://www.googleapis.com/youtube/v3/PLzhYNDOu3MSzPJHlvBnkq-oePCDARvb5u?v=2&alt=json&callback=?', function(data) {
    console.log('json data');
    console.log(data);
  });
};
