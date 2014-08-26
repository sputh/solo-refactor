var $followings = $('#followings');

// Get's Reddit's JSON
var reddit = function(url) {
	$.getJSON(url, function (data){
	  	$.each(data.data.children,
      function (i, post) {
				$('#followings').append('<img src="./assets/reddit.png" class="icon">')
        $('#followings').append( '<a href="'+post.data.url+'"><em>' + post.data.title +'</em></a>');
        $('#followings').append( '<br><a href="http://www.reddit.com/'+post.data.permalink + '">' + post.data.permalink +"</a>" );
        $('#followings').append( '<br>' + post.data.ups );
        $('#followings').append( '<br>' + post.data.downs );
        $('#followings').append( '<hr>' );
	  });
	});
}

// Get's NPR's RSS Feed
var nprRouter = {
	'news' : 1001,
}
var npr = function(cat) {
	var id = nprRouter[cat];
	var url = 'http://api.npr.org/query?id='+id+'&apiKey=MDE2NDAyNjQ0MDE0MDkwMTA3NjdiNDRlYQ001&output=json';
	$.getJSON(url, function (data) {
		$.each(data.list.story, function(i, post) {
			$('#followings').append('<div class="content clear"><img src="./assets/npr.png" class="icon">')
			if(post.thumbnail) {
				$('#followings').append( '<center><img src="' + post.thumbnail.large.$text + '" class="thumbnail"></center>' );
			}
			$('#followings').append( '<em><a href="'+post.link[0].$text+'">' + post.title.$text + '</a></em>');
			if(post.byline) {
				$('#followings').append( '  by  ' + post.byline[0].name.$text );
			};
			$('#followings').append( '<br>' + post.teaser.$text + post.text.paragraph[0].$text);
			$('#followings').append( '</div><hr>' );
		})
	}) 
}

var rssFeed = function(url, name) {
	var profilePic;
	if (name ==='kia') {
		profilePic = './assets/kia.jpg';
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
	   		// if(post.content) {
	   		// 	$('#followings').append(post.content);
	   		// }
	   		$('#followings').append( '<em><a href="'+post.link+'">' + post.title + '</a></em>');
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

reddit('http://www.reddit.com/.json?jsonp=?');
npr('news');
rssFeed('http://kiafathi.azurewebsites.net/rss/', 'kia');
rssFeed('http://www.austentalbot.com/rss/', 'austen'); 