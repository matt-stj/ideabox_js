function createIdea() {
  $("#save-idea").on("click", function() {
    var formTitle = $("#form-idea-title")
    var formBody = $("#form-idea-body")

    var ideaParams = {
      idea: {
        title: formTitle.val(),
        body: formBody.val(),
        quality: 'swill'
      }
    }

    $.ajax({
      type:    "POST",
      url:     "/api/v1/ideas.json",
      data:    ideaParams,
      success: function(newIdea) {
        renderIdea(newIdea)
        formTitle.val(""),
        formBody.val("")

      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
