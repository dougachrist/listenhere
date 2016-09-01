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

onPlayerReady = function(event) {
  event.target.cuePlaylist({list:'PL9343587B2BB7A6CD',
  listType:'playlist',
  index:0});
};

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.CUED) {
    namesArray(event.target.getPlaylist());
    console.log(event.target.getPlaylist());
    // console.log(event.target.getPlaylist().length);
    // console.log(event.target.getVideoData().title);
  }
  if (event.data == YT.PlayerState.ENDED && !done) {
    done = true;
    console.log('Video Finished');
    stopVideo();
  }
}

function namesArray(data){
  console.log(data.length);
  data.forEach(function(songID){
    console.log(songID);

    $.getJSON('https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=' + songID + '&format=json',function(data,status,xhr){
      alert(data.data.title);
    // data contains the JSON-Object below
    });
  });
// move this up
  // var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/PL9343587B2BB7A6CD?v=2&alt=json&callback=?';
  // var vids = new Array();
  //
  // $.getJSON(playListURL, function(data) {
  //   $.each(data.feed.entry, function(i, item) {
  //     vids.push( item['media$group']['yt$videoid']['$t'] );
  //   });
  //   console.log( vids );
  // });
};

function stopVideo() {
  player.stopVideo();
}

// var playListURL = 'http://gdata.youtube.com/feeds/users/AbrahamLingo/uploads?alt=json&callback=?';
//
// var videoURL = 'http://www.youtube.com/watch?v=';
// $.getJSON(playListURL, function(data) {
//   var list_data = '';
//   $.each(data.feed.entry, function(i, item) {
//     var feedTitle = item.title.$t;
//     var feedURL = item.link[1].href;
//     var fragments = feedURL.split('/') ;
//     var videoID = fragments[fragments.length - 2];
//     var url = videoURL + videoID;
//     var thumb = 'http://img.youtube.com/vi/' + videoID + '/hqdefault.jpg';
//     alert(feedTitle);
//   });
// });
