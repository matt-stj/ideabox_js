function editIdea() {
  $('#latest-ideas').delegate('#edit-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    $idea.append(
      "<br>"
      + "<div class='form-group edit-form'>"
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
    var $ideaTitle = $idea.find('#idea-title')
    var $ideaBody = $idea.find('#idea-body')

    var $newTitle = $idea.find('#updated-idea-title').val()
    var $newBody = $idea.find('#updated-idea-body').val()

    $.ajax({
      type:    "PUT",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { idea: { title: $newTitle,
                          body: $newBody } },
        success: function() {
          $ideaTitle.text($newTitle),
          $ideaBody.text($newBody),
          $idea.find('.edit-form').empty()

        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
  };
