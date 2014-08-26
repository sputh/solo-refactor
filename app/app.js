angular.module('agg', [
	'ui.router',
	'ui.bootstrap',
  'navView'
]);

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

})



var siteRouter = function(url) {
  var reddit = new RegExp('reddit', 'g');
  var rss = new RegExp('rss', 'g');
  var npr = new RegExp('npr', 'g');

  if (reddit.test(url)) {
    console.log('reddit');
    getReddit(url);
  } else if (rss.test(url) && npr.test(url)) {
    getNpr(url);
  } else if(rss.test(url)) {
    getRssFeed(url);
  } else {
    // alert('not valid');
    return;
  };
};

var GetJSON = function(url) {
  this.url = url;
  this.storage = {};
  // this.siteRouter();
}

// var post = {
//   icon:
//   title:
//   url:
//   createdAt:
//   snippet:
// }

// Gets Reddit's JSON
var getReddit = function(url) {
  $.getJSON(url, function (data){
      $.each(data.data.children,
      function (i, post) {
        // storage.icon = "./assets/reddit.png";
        // storage.iframUrl = post.data.permalink;
        // storage.url= post.data.url;
        // storage.createdAt = getUnixTime(post.data.created);
        // storage.title = post.data.title;
        // storage.ups = post.data.ups;
        // storage.downs = post.data.downs;

        $('#followings').append('<img src="./assets/reddit.png" class="icon">')
        $('#followings').append( '<a href="'+post.data.url+'"><em>' + post.data.title +'</em></a>');
        $('#followings').append( '<br><a class="postLink" href="http://www.reddit.com/'+post.data.permalink + '" target="iframe_a">' + post.data.permalink +"</a>" );
        $('#followings').append( '<br>' + post.data.ups );
        $('#followings').append( '<br>' + post.data.downs );
        $('#followings').append( '<hr>' );
    });
  });
}
