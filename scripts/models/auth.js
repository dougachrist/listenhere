(function(module) {

  var auth = {};

  var OAUTH2_CLIENT_ID = 'AIzaSyAWXPquA0_hNSNjmW9Y5Bbee4CuL3iowxs';
  var OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube'
  ];

  googleApiClientReady = function() {
    gapi.auth.init(function() {
      window.setTimeout(checkAuth, 1);
    });
  };

  function checkAuth() {
    gapi.auth.authorize({
      client_id: OAUTH2_CLIENT_ID,
      scope: OAUTH2_SCOPES,
      immediate: true
    }, handleAuthResult);
  }

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      // Authorization was successful. Hide authorization prompts and show
      // content that should be visible after authorization succeeds.
      $('.pre-auth').hide();
      $('.post-auth').show();
      loadAPIClientInterfaces();
    } else {
      // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
      // client flow. The current function is called when that flow completes.
      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false
        }, handleAuthResult);
      });
    }
  }

  function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
      handleAPILoaded();
    });
  }

  module.auth = auth;
})(window);
