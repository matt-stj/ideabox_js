$( "#fetch-ideas" ).click(function() {
  fetchIdeas();
});

function renderIdea(idea) {
  $("#latest-ideas").append(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h6>Published on "
    + idea.created_at
    + "</h6><p>"
    + idea.description
    + "</p>"
    + "<button id='delete-idea' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
    + "</div>"
    )
}

function fetchIdeas() {
  var newestItemID = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type:    "GET",
    crossDomain: true,
    url:     "http://matts-idea-box-js.herokuapp.com/api/v1/ideas.json",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
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
