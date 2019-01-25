
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const errorTab = $('.error');
  const composeForm = $('.new-tweet')
  const tweetsContainer = $('#tweets-container')
  errorTab.slideUp(0);
  composeForm.slideUp(0);

  function resetForm(thisElement, callback) {
    thisElement.children('textarea').val('');
    thisElement.children('placeholder').val('What are you humming about?');
    thisElement.children('span').text('140');
    callback();
  }
  
  function checkSubmission(serialized, callback) {
    if(!(serialized.replace('text=', ''))) {
      errorTab.text("You can't post an empty tweet!");
      errorTab.slideDown(100);
      return;
    } else if(serialized.length > 145){
      errorTab.text("Oops, character limit exceeded!");
      errorTab.slideDown(100);
      return;
    } else {
      callback();
      return;
    }
  }

  function renderTweets(tweetArray) {
    tweetsContainer.empty();
    for(const tweet of tweetArray) {
      tweetsContainer.prepend($(createTweetElement(tweet)));
    }
    return tweetsContainer;
  }

  function createTweetElement(tweetObject) {
    //generate a new posttweet article 
    let newTweet = $("<article>")
      .addClass("posttweet")
    //generate and append header (with children) to article
    $("<header>")
      .append($(`<img src=${tweetObject["user"]["avatars"]["small"]}>`))
      .append($('<span/>', {'class': 'user', 'text': `${tweetObject["user"]["name"]}`}))
      .append($('<span/>', {'class': 'tag', 'text': `${tweetObject["user"]["handle"]}`}))
      .appendTo(newTweet);
    //generate and append tweet text
    $('<p/>,', {'text': `${tweetObject["content"]["text"]}`})
      .appendTo(newTweet);
    //generate and append footer (with Font awesome 4 icons)
    $('<footer>')
      .append($('<span/>', { 'data-livestamp': `${tweetObject["created_at"] / 1000}`}))
      .append($('<i>', {'class': "fa fa-flag"}))
      .append($('<i>', {"class": 'fa fa-retweet'}))
      .append($('<i>', {"class": 'fa fa-heart'}))
      .appendTo(newTweet);

    return newTweet;
  }



  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .done(function (tweets) {
      tweetsContainer.replaceWith(renderTweets(tweets));
    })
  }
  
  $('.compose').click(function(){
    composeForm.slideToggle(120, function() {
      $(this).children('form').children('textarea').focus();
    });
  })

  loadTweets();

  $('#newtweet').on('submit', function (event) {
    event.preventDefault();
    console.log('Submitted, performing ajax call...');
    const serialized = $(this).serialize();
    const thisElement = $(this);
    errorTab.slideUp(100);

    checkSubmission(serialized, function () {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized,
      }).done(function () {
        resetForm(thisElement, loadTweets);
      });
    })
});

});

  
