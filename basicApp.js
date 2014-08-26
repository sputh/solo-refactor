var $followings = $('#followings');

// Get's Reddit's JSON
var reddit = function(url) {
	$.getJSON(url, function (data){
	  	$.each(data.data.children,
      function (i, post) {
      	console.log('rp', post)
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

// $('#addSource').on('click', function(){
// 	alert('you've clicked it');
// })

reddit('http://www.reddit.com/.json?jsonp=?');
npr('news');

// kiafathi.com
// austentalbot.com    