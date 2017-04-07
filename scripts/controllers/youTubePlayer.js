var songsArray = [];

onYouTubeIframeAPIReady = function() {
  player = new YT.Player('video-placeholder', {
    width: 600,
    height: 400,
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      html: 5,
      showinfo: 0,
      color: 'white'
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

onPlayerReady = function(event) {
  event.target.cuePlaylist({list:homeView.userPlaylist,
    listType:'playlist',
    index:0});
};

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.CUED) {
    namesArray(event.target.getPlaylist());
    console.log(event.target.getPlaylist());

  }
  if (event.data == YT.PlayerState.ENDED && !done) {
    done = true;
    console.log('Video Finished');
    stopVideo();
  }
}

function namesArray(data){
  var gapi = 'AIzaSyAWXPquA0_hNSNjmW9Y5Bbee4CuL3iowxs';
  data.forEach(function(songID){
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + songID + '&key=' + gapi + '&part=snippet',function(data,status,xhr){
      songsArray.push(data.items[0].snippet.title);
    }).done(function(){
      if(songsArray.length === data.length){
        console.log(songsArray);
        var url2 = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWXPquA0_hNSNjmW9Y5Bbee4CuL3iowxs';
        $.getScript(url2).done(function(script, textStatus) {
          console.log('map api finished with status ' + textStatus);
          createMap.initMap();
        });
      }
    });
  });

};

function stopVideo() {
  player.stopVideo();
}
