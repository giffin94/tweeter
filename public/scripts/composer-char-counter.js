$(document).ready(function() {
  $('#newTweet').on('input', function (event) {
    let remainingChars  = 140 - $('#newTweet').val().length;
    (remainingChars > 0 ? $(this).siblings("span").css('color', 'black') : $(this).siblings("span").css('color', 'red'));
    $(this).siblings("span")[0].innerText = remainingChars;
  });
});


