function searchBar() {

  $("#search").on("keypress", function (e) {
    if (e.keyCode == 13) {
      return false;
    }
  });

  $("#search").on("keyup", function() {
    var filter = $(this).val();
    var ideas = $("#latest-ideas").children()
    $.each(ideas, function(){
      if ($(this).find('#idea-title, #idea-body').text().search(new RegExp(filter, "i")) === -1) {
        $(this).addClass("invisible")
      }
      else {
        $(this).removeClass("invisible")
      }
    })
  })
}
