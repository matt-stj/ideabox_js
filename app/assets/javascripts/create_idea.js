function createIdea() {
  $("#save-idea").on("click", function() {
    var ideaParams = {
      idea: {
        title: $("#idea-title").val(),
        body: $("#idea-body").val()
      }
    }

    $.ajax({
      type:    "POST",
      url:     "api/v1/ideas.json",
      data:    ideaParams,
      success: function(newIdea) {
        renderIdea(newIdea)
        $("#idea-body").val(""),
        $("#idea-title").val("")
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
