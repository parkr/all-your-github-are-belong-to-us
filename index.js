(function(){
  "use strict";
  
  var github = require('git-at-me');

  github({
    token: require('./github-token'),
    user: process.env.GITHUB_USERNAME,
    repo: process.env.GITHUB_REPOSITORY,
    skipHook: (process.env.AYGABTU_SKIP_HOOK || true),
    // http://developer.github.com/v3/repos/hooks/#events
    events: JSON.parse(process.env.GITHUB_HOOK_EVENTS),
    // The URL that github will post to; should match your site url
    url: process.env.AYGABTU_URL + '/git-at-me/events',
    // More options for configuration documented below
    port: process.env.PORT
  }).on('push', function (pushInfo) {
    // Do something with commits
  }).on('pull_request', function (prInfo) {
    // Do something with PR
  }).on('issue', function (issueInfo) {
    // Do something with issue
  }).on('release', function (releaseInfo) {
    // Do something with release
  });

  /* **Snip all the express configuration** */

  server.get('index', function (req, res) {
    res.render('index'); 
  });

  server.listen();
})();
