$((function() {
  $('#newTweet').on('input', function (event) {
    let remainingChars  = 140 - $('#newTweet').val().length;
    remainingChars > -1 ? $(this).siblings("span").removeClass("invalid") : $(this).siblings("span").addClass("invalid");
    console.log($(this).siblings("span"));
    $(this).siblings("span")[0].innerText = remainingChars;
  });
}));


