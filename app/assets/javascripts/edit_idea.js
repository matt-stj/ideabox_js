function editIdea() {
  $('#latest-ideas').delegate('#edit-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    $idea.append(
      "<br>"
      + "<div class='form-group'>"
      + "<label for='updated-idea-title'>Idea Title:</label>"
      + "<input class='form-control' type='text' id='updated-idea-title'>"
      + "<label for='updated-idea-body'>Idea Body:</label>"
      + "<input class='form-control' type='text' id='updated-idea-body'>"
      + "<button id='update-idea' name='button-update' class='btn btn-primary'>Save</button>"
      + "</div>"
    )

  })
}

function saveEditedIdea(idea) {
  $('#latest-ideas').delegate('#update-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    var updatedIdeaParams = {
      idea: {
        title: $idea.find('#updated-idea-title').val(),
        body: $idea.find('#updated-idea-body').val()
      }
    }

    $.ajax({
      type:    "PUT",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { idea: { title: $idea.find('#updated-idea-title').val(),
                          body: $idea.find('#updated-idea-body').val() } },
        success: function() {
          console.log("successfully updated!")
        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
  };
