var $followings = $('#followings');

var getUnixTime = function(ts) {
  var date = new Date(ts*1000);
  return (date);
}

var GetJSON = function(url) {
  this.url = url;
  this.storage = {};
  this.siteRouter();
}
var siteRouter = function(url) {
  var reddit = new RegExp('reddit', 'g');
  var rss = new RegExp('rss', g);
  var npr = new RegExp('npr', g);
  if (reddit.test(url)) {
    url.getReddit();
  } else if (rss.test(url) && npr.test(url)) {
    url.getNpr();
  } else if(rss.test(url)) {
    url.getRssFeed();
  } else {
    alert('not valid');
  };
};

// var post = {
//   icon:
//   title:
//   url:
//   createdAt:
//   snippet:
// }

// Gets Reddit's JSON
var getReddit = function() {
  this.storage = {'a':1};
  var url = this;
	$.getJSON(url, function (data){
	  	$.each(data.data.children,
      function (i, post) {
        storage.icon = "./assets/reddit.png";
        storage.iframUrl = post.data.permalink;
        storage.url= post.data.url;
        storage.createdAt = getUnixTime(post.data.created);
        storage.title = post.data.title;
        storage.ups = post.data.ups;
        storage.downs = post.data.downs;

				$('#followings').append('<img src="./assets/reddit.png" class="icon">')
        $('#followings').append( '<a href="'+post.data.url+'"><em>' + post.data.title +'</em></a>');
        $('#followings').append( '<br><a class="postLink" href="http://www.reddit.com/'+post.data.permalink + '">' + post.data.permalink +"</a>" );
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
			$('#followings').append( '<em><a class="postLink" href="'+post.link[0].$text+'">' + post.title.$text + '</a></em>');
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
	   		$('#followings').append('<div class="content clear"><img src="'+ profilePic + '" class="icon">')
	   		$('#followings').append( '<em><a class="postLink" href="'+post.link+'">' + post.title + '</a></em>');
	   		$('#followings').append( '<br>' + post.publishedDate + post.contentSnippet);
	   		$('#followings').append( '</div><hr>' );
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
// getReddit(perm);
getReddit(perm);
// console.log(perm.storage);
getNpr('news');
getRssFeed('http://kiafathi.azurewebsites.net/rss/', 'kia');
getRssFeed('http://www.austentalbot.com/rss/', 'austen');
