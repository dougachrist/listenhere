
var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

var gapi = '"https://maps.googleapis.com/' + process.env.GOOGLE_API_KEY + '&callback=initMap"';

var proxyGoogleAPI = function(request, response) {
  console.log('routing Google API request for', request.params[0]);
  (
    requestProxy({
      url: 'https://maps.googleapis.com/' + request.params[0],
      headers: {
        'key': process.env.GOOGLE_API_KEY
      }
    })
  )(request, response);
};

app.post('/theGoogles/*', proxyGoogleAPI);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
