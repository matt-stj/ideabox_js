function renderIdea(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea well text-center pagination-centered' data-id='"
    + idea.id
    + "'><h3 class='title'>Title: <span contentEditable=true id='idea-title'>"
    + idea.title
    + "</span></h3><h6 class='body'>Body: <span contentEditable=true id='idea-body'>"
    + idea.body
    + "</span></h5><h4 class='quality' >Quality: <span class='idea-quality'>"
    + idea.quality
    + "</span></h4><p>Posted: "
    + timeSince(new Date(idea.created_at))
    + " ago"
    + "</p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger'>Delete</button>"
    + "<button id='edit-idea' name='button-idea' class='btn btn-warning'>Edit</button>"
    + "<button type='button' id='upgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> </button>"
    + "<button type='button' id='downgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span> </button>"
    + "</div>"
    )
}
