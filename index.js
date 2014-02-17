(function(){
  "use strict";

  var github = require('git-at-me')
    , mongoClient = require('mongodb').MongoClient
    , mongoDBURL  = (process.env.MONGOHQ_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/aygabtu")
    , events      = JSON.parse(process.env.GITHUB_HOOK_EVENTS);

  var addToMongo = function(event_name, info) {
    console.log("Connecting to MongoDB database: " + mongoDBURL);
    mongoClient.connect(mongoDBURL, function(err, db) {
      if(err) throw err;
      var collection = db.collection(event_name);
      collection.insert(info);
    });
  };

  var gitAtMe = github({
    token: process.env.GITHUB_TOKEN,
    user: process.env.GITHUB_USERNAME,
    repo: process.env.GITHUB_REPOSITORY,
    skipHook: (process.env.AYGABTU_SKIP_HOOK || true),
    // https://github.com/github/github-services/blob/3adc8da1485341316700b288c1dabc566e85fb96/lib/service.rb#L79
    events: events,
    // The URL that github will post to; should match your site url
    url: process.env.AYGABTU_URL + '/git-at-me/events',
    // More options for configuration documented below
    port: process.env.PORT
  })
  events.forEach(function(event_name){
    gitAtMe.on(event_name, function(info){
      console.log(info);
      addToMongo(event_name, info);
    });
  });

})();
