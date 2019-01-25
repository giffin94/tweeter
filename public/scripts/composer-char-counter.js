/* Script for handling character counter */

$(function() {

  $('#newtweet').children('textarea').on('input', function (event) {
    let remainingChars  = 140 - $(this).val().length;
    remainingChars > -1 ? $(this).siblings("span").removeClass("invalid") : $(this).siblings("span").addClass("invalid");
    $(this).siblings("span").text(remainingChars);
  });

});


