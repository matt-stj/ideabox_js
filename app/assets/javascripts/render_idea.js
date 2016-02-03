function renderIdea(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h3 class='title'>Title: <span id='idea-title'>"
    + idea.title
    + "</span></h3><h6 class='body'>Body: <span id='idea-body'>"
    + idea.body
    + "</span></h5><h6 class='quality' >Quality: <span class='idea-quality'>"
    + idea.quality
    + "</span></h6><p>Posted at: "
    + idea.created_at
    + "</p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger'>Delete</button>"
    + "<button id='edit-idea' name='button-idea' class='btn btn-warning'>Edit</button>"
    + "<button type='button' id='upgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> </button>"
    + "<button type='button' id='downgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span> </button>"
    + "</div>"
    )
}
