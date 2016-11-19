page('/', home);
page('/markers', markers);
page('/playlist', playlist);

page('*', home);
page();

function home() {
  homeView.render();
}

function markers() {
  addMarkersView.render();
}

function playlist(){
  playList.render();
}
