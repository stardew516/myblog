$(document).on("click", "#delete", function () {
  $('#popup').modal({
    keyboard: true
  });
  return false;
}).on("click", "#cancel", function () {
    return false;
}).on("click", "#confirm", function () {
  var url = $("#delete")[0].href;
  $('#popup').modal('hide');
  window.location.href = url
});
