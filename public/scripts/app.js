
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

  //clear form on tweet submission
  function resetForm (thisElement, callback) {
    thisElement.children('textarea').val('');
    thisElement.children('placeholder').val('What are you humming about?');
    thisElement.children('span').text('140');
    callback();
  }
  //handles empty tweet or too many characters
  function checkSubmission (serialized, callback) {
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
  // accepts an array of tweet objects and send individual tweets to createTweetElement
  function renderTweets (tweetArray) {
    tweetsContainer.empty();
    for(const tweet of tweetArray) {
      tweetsContainer.prepend($(createTweetElement(tweet)));
    }
    return tweetsContainer;
  }

  //dynamically generate tweet from an object
  function createTweetElement (tweetObject) {
    //article class: posttweet
    let newTweet = $("<article>")
      .addClass("posttweet")
    //header with avatar, username, and tag
    $("<header>")
      .append($(`<img src=${tweetObject["user"]["avatars"]["small"]}>`))
      .append($('<span>', {'class': 'user', 'text': `${tweetObject["user"]["name"]}`}))
      .append($('<span>', {'class': 'tag', 'text': `${tweetObject["user"]["handle"]}`}))
      .appendTo(newTweet);
    //Tweet content
    $('<p>,', {'text': `${tweetObject["content"]["text"]}`})
      .appendTo(newTweet);
    //footer with icons
    $('<footer>')
      .append($('<span>', { 'data-livestamp': `${tweetObject["created_at"] / 1000}`}))
      .append($('<i>', {'class': "fa fa-flag"}))
      .append($('<i>', {"class": 'fa fa-retweet'}))
      .append($('<i>', {"class": 'fa fa-heart'}))
      .append($('<span>', { "class": "like-counter",'data-id': `${tweetObject["_id"]}`}).text(`0`))
      .append($('<button>', {"class": "likeBtn",'data-id': `${tweetObject["_id"]}`}).text(`${tweetObject["likes"]}`))
      .appendTo(newTweet);

    return newTweet;
  }

  //loadtweets gets array of tweets from our mongodb and calls rendertweets
  function loadTweets () {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .done(function(tweets) {
      tweetsContainer.replaceWith(renderTweets(tweets));
    });
  };

  tweetsContainer.on("click", ".likeBtn", function() {
    let tweetId = (this.dataset.id);
    let likeTotal = Number(this.innerText) + 1;
    $.ajax({
      method: 'POST',
      url: '/tweets?_method=PUT',
      data: {
        id: tweetId,
        likes: likeTotal
      }
    }).done(loadTweets())
  });

  //toggle compose tweet form
  $('.compose').click(function() {
    composeForm.slideToggle(120, function() {
      $(this).children('form').children('textarea').focus();
    });
  });

  // load tweets on page load
  loadTweets();

  // handle submission of new tweet
  $('#newtweet').on('submit', function(event) {
    event.preventDefault();
    console.log('Submitted, performing ajax call...');
    const serialized = $(this).serialize();
    const thisElement = $(this);
    errorTab.slideUp(100);

    checkSubmission(serialized, function() {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized,
      }).done(function() {
        resetForm(thisElement, loadTweets);
      });
    });
  });
});

  
