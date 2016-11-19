(function(module) {

  var homeView = {};
  homeView.userPlaylist;

  homeView.render = function() {
    $('.mapView').addClass('notShown');
    $('main').append('<h1>Paste a youTube playlist here!</h1>');
    $('main').append('<input id="playlistEntered" type= "text" value="PL9343587B2BB7A6CD">');
    $('main').append('<button>Continue</button>');
    $('button').on('click', function(){
      homeView.userPlaylist = $('#playlistEntered').attr('value');
      var url = 'https://www.youtube.com/iframe_api';
      $.getScript(url, function(){
        console.log('api running');
      }).done(function(){
        console.log('api done');
      });
    });
  };

  module.homeView = homeView;
})(window);
