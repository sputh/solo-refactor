var $followings = $('#followings');

// Get's Reddit's JSON

var reddit = function(url) {
	$.getJSON(url,
	  function (data){
	  	$.each(data.data.children,
      function (i, post) {
        $('#followings').append( '<br>' + '<a href=post.data.url>' + post.data.title +'</a>');
        $('#followings').append( '<br>' + post.data.url );
        $('#followings').append( '<br>' + post.data.permalink );
        $('#followings').append( '<br>' + post.data.ups );
        $('#followings').append( '<br>' + post.data.downs );
        $('#followings').append( '<hr>' );
	  });
	});
}

// reddit('http://www.reddit.com/.json?jsonp=?');

// $('#addSource').on('click', function(){
// 	alert('you've clicked it');
// })
// Get's NPR's RSS Feed
$.getJSON('http://api.npr.org/query?id=1001&apiKey=MDE2NDAyNjQ0MDE0MDkwMTA3NjdiNDRlYQ001&output=json', 
	function (data) {
		$.each(data.list, 
			function(i, post) {
				// $('#followings').append( '<br>' + post.title)
				console.log("post", post.$text);
			})
		console.log('data', data)
	}
)      
		// $.each(data.item,
		// 	function(i, post) {
		// 		console.log("i", i);
		// 		console.log('post', post);
		// 	}
		// 	// $('#followings').append( '<br>' + data.title.$text);
		// 	// $('#followings').append('<hr>');
		// );
		// console.log('data', data);}