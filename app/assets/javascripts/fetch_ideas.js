function fetchIdeas() {
  var newestItemID = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type:    "GET",
    crossDomain: true,
    url:     "/api/v1/ideas.json",
    success: function(ideas) {
      var sortedIdeas = ideas.sort(function(a,b){
        return new Date(a.created_at) - new Date(b.created_at);
      });

      $.each(sortedIdeas, function(index, idea) {
        if (isNaN(newestItemID) || idea.id > newestItemID) {
          renderIdea(idea)
        }
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}
