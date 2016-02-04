function inlineEditTitle() {
  $('#latest-ideas').delegate('#idea-title', 'keydown', function(event) {

    var enterKeyPress = event.which == 13


    if (enterKeyPress) {
      var $idea = $(this).closest(".idea")
      var $title = $idea.find('#idea-title').text()

      event.preventDefault();
      this.blur();

      $.ajax({
        type:    "PUT",
        url:     '/api/v1/ideas/' + $idea.attr('data-id') + ".json",
        data:    { idea: { title: $title } },
        success: function() {
          console.log("successfully updated!")
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    }
  })

}

function inlineEditBody() {
  $('#latest-ideas').delegate('#idea-body', 'keydown', function(event) {

    var enterKeyPress = event.which == 13


    if (enterKeyPress) {
      var $idea = $(this).closest(".idea")
      var $body = $idea.find('#idea-body').text()

      event.preventDefault();
      this.blur();

      $.ajax({
        type:    "PUT",
        url:     '/api/v1/ideas/' + $idea.attr('data-id') + ".json",
        data:    { idea: { body: $body } },
        success: function() {
          console.log("successfully updated!")
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    }
  })

}
