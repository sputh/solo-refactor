var $followings = $('#followings');

var getUnixTime = function(ts) {
  var date = new Date(ts*1000);
  return (date);
}

$('.glyphicon').on('click', function() {
  console.log('hi');
  $('#panel').slideToggle('slow');
})

// Gets Reddit's JSON
var getReddit = function(url) {
  var jsonUrl;
  if(!url) {
    jsonUrl = 'http://www.reddit.com/.json?jsonp=?'
  } else {
    jsonUrl= 'http://www.reddit.com/r/' + url +'/.json?jsonp=?'
  }
	$.getJSON(jsonUrl, function (data){
	  	$.each(data.data.children,
      function (i, post) {
        console.log(post);
				$('#followings').append('<img src="./assets/reddit.png" class="icon">')
        $('#followings').append( '<a href="'+post.data.url+'" target="iframe_a"><em>' + post.data.title +'</em></a>');
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
  // name = name | 'else';
	var profilePic;
	if (name ==='kia') {
		profilePic = './assets/kia.png';
	} else if (name === 'austen') {
		profilePic = './assets/austen.jpg';
	} else {
    profilePic = './assets/rss.png';
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

var perm = 'http://www.reddit.com/.json?jsonp=?'
// getReddit('http://www.reddit.com/');
// getReddit();
getReddit('dataisbeautiful')
getNpr('news');
getRssFeed('http://kiafathi.azurewebsites.net/rss/', 'kia');
getRssFeed('http://www.austentalbot.com/rss/', 'austen');
// getRssFeed('http://www.reddit.com/');
