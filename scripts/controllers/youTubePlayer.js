onYouTubeIframeAPIReady = function() {
  player = new YT.Player('video-placeholder', {
    width: 600,
    height: 400,
    playerVars: {
      autoplay: 1,
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

onPlayerReady = function(event, next) {
  event.target.cuePlaylist({list:'PL9343587B2BB7A6CD',
  listType:'playlist',
  index:1});
};

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.CUED) {
    console.log(event.target.getPlaylist().length);
    // event.target.playVideo();
    console.log(event.target.getVideoData().title);
  }
  if (event.data == YT.PlayerState.ENDED && !done) {
    done = true;
    console.log('Video Finished');
    stopVideo();
  }
}

function stopVideo() {
  player.stopVideo();
}
