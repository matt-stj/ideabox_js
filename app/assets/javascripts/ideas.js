$(document).ready(function() {
  fetchIdeas();
  createIdea();
  deleteIdea();
  upgradeIdea();
})


function renderIdea(idea) {
  $("#latest-ideas").append(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h3>Title: "
    + idea.title
    + "</h3><h6>Body: "
    + idea.body
    + "</h5><h6 class='quality' >Quality: "
    + idea.quality
    + "</h6><p>Posted at: "
    + idea.created_at
    + "</p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger btn-xs'>Delete</button>"
    + "<button type='button' id='upgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> </button>"
    + "<button type='button' id='downgrade-idea' class='btn btn-default' aria-label='Left Align'> <span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span> </button>"
    + "</div>"
    )
}

function fetchIdeas() {
  var newestItemID = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type:    "GET",
    crossDomain: true,
    url:     "api/v1/ideas.json",
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



function deleteIdea() {
  $('#latest-ideas').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    $.ajax({
      type: 'DELETE',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      success: function() {
        $idea.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}


function upgradeIdea() {
  $('#latest-ideas').delegate('#upgrade-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    $.ajax({
      type: 'POST',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      success: function() {
        $idea.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function upgradeIdea() {
  $('#latest-ideas').delegate('#upgrade-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    var ideaParams = {
      idea: {
        quality: 1
      }
    }

    $.ajax({
      type:    "POST",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { _method:'PUT', ideaParams },
        success: function() {
          $($idea).find('.quality').text("Quality: " + $idea.attr('quality'))
        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
