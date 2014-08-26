var $followings = $('#followings');

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

var getUnixTime = function(ts) {
  var date = new Date(ts*1000);
  return (date);
}

$('.glyphicon').on('click', function() {
  console.log('hi');
  $('#panel').slideToggle('slow');
})

var GetJSON = function(url) {
  this.url = url;
  this.storage = {};
  // this.siteRouter();
}

var getReddit = function() {
  var storage = this.storage;
  var url = this.url;
  $.getJSON(url, function (data){
    $.each(data.data.children, function (i, post) {
      storage = {
        'b' : 10
      }
      storage.icon = "./assets/reddit.png";
      storage.title = post.data.title;
      storage.iframUrl = post.data.permalink;
      storage.createdAt = getUnixTime(post.data.created);
      storage.url= post.data.url;
      storage.ups = post.data.ups;
      storage.downs = post.data.downs;

      $('#followings').append('<img src="./assets/reddit.png" class="icon">')
      $('#followings').append( '<a href="'+post.data.url+'" target="iframe_a"><em>' + post.data.title +'</em></a>');
      $('#followings').append( '<br><a class="postLink" href="http://www.reddit.com/'+post.data.permalink + '">' + post.data.permalink +"</a>" );
      $('#followings').append( '<br>' + post.data.ups );
      $('#followings').append( '<br>' + post.data.downs );
      $('#followings').append( '<hr>' );
    });
  });
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

// Gets NPR's RSS Feed
var nprRouter = {
	'news' : 1001,
}
var getNpr = function(cat) {
	var id = nprRouter[cat];
	var url = 'http://api.npr.org/query?id='+id+'&apiKey=MDE2NDAyNjQ0MDE0MDkwMTA3NjdiNDRlYQ001&output=json';
	$.getJSON(url, function (data) {
		$.each(data.list.story, function(i, post) {
			$('#followings').append('<div class="content clear"><img src="./assets/npr.png" class="icon">')
			if(post.thumbnail) {
				$('#followings').append( '<center><img src="' + post.thumbnail.large.$text + '" class="thumbnail"></center>' );
			}
			$('#followings').append( '<em><a class="postLink" href="'+post.link[0].$text+'" target="iframe_a">' + post.title.$text + '</a></em>');
			if(post.byline) {
				$('#followings').append( '  by  ' + post.byline[0].name.$text );
			};
			$('#followings').append( '<br>' + post.teaser.$text + post.text.paragraph[0].$text);
			$('#followings').append( '</div><hr>' );
		})
	})
}

// Gets other RSS Feeds
var getRssFeed = function(url, name) {
	var profilePic;
	if (name ==='kia') {
		profilePic = './assets/kia.png';
	} else if (name === 'austen') {
		profilePic = './assets/austen.jpg';
	}

	var feedApiGetJSON = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q='+ url;
	$.ajax({
    url:feedApiGetJSON,
    dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
    success:function(json){
	   	$.each(json.responseData.feed.entries, function(i, post) {
        var divContainer = $('<div></div>');
	   		divContainer.append('<div class="content clear"><img src="'+ profilePic + '" class="icon">')
	   		divContainer.append( '<em><a class="postLink" href="'+post.link+'" target="iframe_a">' + post.title + '</a></em>');
	   		divContainer.append( '<br>' + post.publishedDate + post.contentSnippet);
	   		divContainer.append( '</div><hr>' );
        $('#followings').append(divContainer);
	   	})
  	},
    error:function(){
        alert("Error");
    }
	});
};


$('#addSource').on('click', function(){
	event.preventDefault();
	// create a ROUTER!
})

// $(."postLink").on('click')
var perm = 'http://www.reddit.com/.json?jsonp=?'
// var testing = new GetJSON(perm);
// siteRouter(perm);
// console.log("storage", testing.storage);
getReddit(perm);
// console.log(perm.storage);
getNpr('news');
getRssFeed('http://kiafathi.azurewebsites.net/rss/', 'kia');
getRssFeed('http://www.austentalbot.com/rss/', 'austen');
