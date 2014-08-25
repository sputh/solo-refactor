// Get's Reddit's JSON

$.getJSON('http://reddit.com/.json?jsonp=?', function(data) {
	// $.each(data.children, function(i, item) {

	// })
	console.log(data);
})