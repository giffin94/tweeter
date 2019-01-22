$(document).ready(function() {
  console.log("Ready!");
  $('#newTweet').on('input', function (event) {
    let remainingChars  = 140 - $('#newTweet').val().length;
    console.log($(this).siblings("span"));
    $(this).siblings("span").css('color', 'black');
    if (remainingChars < 0) {
      $(this).siblings("span").css('color', 'red');
    } 
    $(this).siblings("span")[0].innerText = remainingChars;
  });
});



