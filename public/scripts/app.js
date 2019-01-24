
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const errorTab = $('.error');
  errorTab.slideUp(0);

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



  function loadTweets() {
    $.ajax({ 
      method: 'GET',
      url: '/tweets'
    })
    .done(function (tweets) {
      $('#tweets-container').replaceWith(renderTweets(tweets));
    })
  }

  $('.compose').click(function(){
    $('.new-tweet').slideToggle(120, function() {
      $(this).children('form').children('textarea').focus();
    });
  })

  loadTweets();

  $('#newtweet').on('submit', function (event) {
  event.preventDefault();
  console.log('Submitted, performing ajax call...');
  const serialized = $(this).serialize();
  const thisElement = $(this);
  if(serialized === 'text=') {
    errorTab.text("You can't post an empty tweet!");
    errorTab.slideToggle(100, function() {
      setTimeout(function(){
        errorTab.slideToggle("slow")
      }, 3000);
    });
  } else if(serialized.length > 145){
    errorTab.text("Oops, character limit exceeded!");
    errorTab.slideToggle(100, function() {
      setTimeout(function(){
        errorTab.slideToggle("slow")
      }, 3000);
    });
  } else {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serialized,
    }).done(function () {
      console.log(thisElement);
      thisElement.children('textarea').val('');
      thisElement.children('placeholder').val('What are you humming about?');
      $('.counter').text('140');
      loadTweets() 
    });
  }
});

  

});

  
