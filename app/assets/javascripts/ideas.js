$( "#fetch-ideas" ).click(function() {
  renderIdea();
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
