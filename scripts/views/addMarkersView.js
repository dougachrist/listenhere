(function(module) {

  var addMarkersView = {};

  addMarkersView.render = function() {
    $('section.mapView').removeClass('notShown');
    $('main').append('<h1>Add a marker for each song</h1>');
    console.log('songArray');
    console.log(songsArray);
    songsArray.forEach(function(data, index){
      index++;
      $('main').append('<h1>' + 'Song ' + index + ': ' + data + '</h1>');
    });
  };

  module.addMarkersView = addMarkersView;
})(window);
