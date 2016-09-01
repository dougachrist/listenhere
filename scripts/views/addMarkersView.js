(function(module) {

  var addMarkersView = {};

  addMarkersView.render = function() {
    $('section.mapView').removeClass('notShown');
    $('main').append('<h1>Add a marker for each song</h1>');
  };

  module.addMarkersView = addMarkersView;
})(window);
