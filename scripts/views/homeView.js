(function(module) {

  var homeView = {};

  homeView.render = function() {
    $('.mapView').addClass('notShown');
    $('main').append('<h1>Paste a youTube playlist here!</h1>');
    $('main').append('<input value="PL9343587B2BB7A6CD">');
    $('main').append('<button>Continue</button>');
    $('button').on('click', function(){
      console.log('click event');
      page('/markers');
    });
  };

  module.homeView = homeView;
})(window);
