(function(module) {

  var homeView = {};
  homeView.userPlaylist;

  homeView.render = function() {
    $('.mapView').addClass('notShown');
    $('main').append('<h1 class="playListView">Paste a youTube playlist here!</h1>');
    $('main').append('<input class="playListView" id="playlistEntered" type="text" value="PL9343587B2BB7A6CD">');
    $('main').append('<button class="playListView">Continue</button>');
    $('main').append('<div class="playlistPreview"></div>');
    $('button').on('click', function(){
      page('/markers');
      homeView.userPlaylist = $('#playlistEntered').prop('value');
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
