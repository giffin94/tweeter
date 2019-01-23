
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  // renderTweets(tweetData);
  
  function renderTweets(tweetArray) {
    $('#tweets-container').empty();
    for(const tweet of tweetArray) {
      $('#tweets-container').prepend($(createTweetElement(tweet)));
    }
    return $('#tweets-container');
  }

  function createTweetElement(tweetObject) {
    let newTweet = $("<article>")
      .addClass("posttweet").append(
        $("<header>").append(
          (`<img src=${tweetObject["user"]["avatars"]["small"]}>`)
        ).append(
            $('<span/>', {'class': 'user', 'text': `${tweetObject["user"]["name"]}`})
        ).append(
            $('<span/>', {'class': 'tag', 'text': `${tweetObject["user"]["handle"]}`})
        )
      ).append(
        $('<p/>,', {'text': `${tweetObject["content"]["text"]}`})
      ).append(
        $('<footer>').append(
          $('<span/>', { 'data-livestamp': `${tweetObject["created_at"] / 1000}`})
          ).append(
            $('<i>', {'class': "fa fa-flag"})
          ).append(
            $('<i>', {"class": 'fa fa-retweet'})
          ).append(
            $('<i>', {"class": 'fa fa-heart'})
          )
      );
    return newTweet;
  }

  var $posts = $('#newtweet');
  $posts.on('submit', function (event) {
    event.preventDefault();
    console.log('Submitted, performing ajax call...');
    const serialized = $(this).serialize();
    console.log(serialized);
    if(serialized !== 'text=' && serialized.length <= 145) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized,
      }).done(function () {
        $('#newTweet').val('');
        $('.counter').text('140');
        loadTweets() 
      });
    } else {
      alert("Invalid tweet!");
    }
  });

  function loadTweets() {
    $.ajax({ 
      method: 'GET',
      url: '/tweets'
    })
    .done(function (tweets) {
      $('#tweets-container').replaceWith(renderTweets(tweets));
    })
  }

  loadTweets();


  

});

  
