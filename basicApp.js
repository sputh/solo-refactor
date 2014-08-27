var $followings = $('#followings');

var getUnixTime = function(ts) {
  var date = new Date(ts*1000);
  return (date);
}

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
        // console.log('selftext', post.data.selftext)
        // console.log(post);
        var divContainer = $('<div class="group"></div>');
        divContainer.append('<img src="./assets/reddit.png" class="icon">')
        divContainer.append( '<a href="'+post.data.url+'" target="iframe_a"><em>' + post.data.title +'</em></a>');
        divContainer.append( '<br><a class="postLink" href="http://www.reddit.com/'+post.data.permalink + '" target="iframe_a">' + post.data.permalink +"</a>" );
        // divContainer.append( '<br>' + post.data.selftext );
        divContainer.append( '<br>' + post.data.ups );
        divContainer.append( '<br>' + post.data.downs );
        divContainer.append( '<hr>' );
        $('#followings').append(divContainer);
    });
  });
}

// Gets NPR's RSS Feed
var nprRouter = {
  'news' : 1001,
  'economy' : 1017,
  'education' : 1013,
  'environment' : 1025,
  'all' : 3002,
  'music' : 3018,
  'food' : 1053,
  'science' : 1007,
  'space' : 1026,
  'sports' : 1055,
  'health' : 1128
}
var getNpr = function(cat) {
  var id = nprRouter[cat];
  var url = 'http://api.npr.org/query?id='+id+'&apiKey=MDE2NDAyNjQ0MDE0MDkwMTA3NjdiNDRlYQ001&output=json';
  $.getJSON(url, function (data) {
    $.each(data.list.story, function(i, post) {
      var divContainer = $('<div></div>');
      divContainer.append('<div class="content clear"><img src="./assets/npr.png" class="icon">')
      if(post.thumbnail) {
        divContainer.append( '<center><img src="' + post.thumbnail.large.$text + '" class="thumbnail"></center>' );
      }
      divContainer.append( '<em><a class="postLink" href="'+post.link[0].$text+'" target="iframe_a">' + post.title.$text + '</a></em>');
      if(post.byline) {
        divContainer.append( '  by  ' + post.byline[0].name.$text );
      };
      divContainer.append( '<br>' + post.teaser.$text + post.text.paragraph[0].$text);
      divContainer.append( '</div><hr>' );
      $('#followings').prepend(divContainer);
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
        $('#followings').prepend(divContainer);
      })
    },
    error:function(){
        alert("Error");
    }
  });
};

getNpr('news');
getReddit('dataisbeautiful')
getRssFeed('http://kiafathi.azurewebsites.net/rss/', 'kia');
getRssFeed('http://www.austentalbot.com/rss/', 'austen');
// getRssFeed('http://www.reddit.com/');

$('.glyphicon').on('click', function() {
  // console.log(this.id);
  $('.panel').slideUp('slow');
  $('.panel' + '#'+this.id).slideToggle('slow');
})
// "addSubReddit"
// "addNpr">Add N
// "addRss">Add O

var addRouter = function (id) {
  var pass = $('input').val()
  if (id==='addSubReddit') {
    getReddit(pass);
  } else if (id ==='addNpr') {
    getNpr(pass);
  } else if (id ==='addRss') {
    getRssFeed(pass);
  }
}

$('.addSource').on('click', function(){
  event.preventDefault();
  // console.log('id',this.id);
  // var select = $('input').val();
  // console.log('value',select);
  addRouter(this.id);
  // create a ROUTER!
})
