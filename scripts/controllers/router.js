page('/', home);
page('/markers', markers);

page('*', home);
page();

function home() {
  homeView.render();
}

function markers() {
  addMarkersView.render();
}
