$(document).ready(function() {
  fetchIdeas();
  createIdea();
  deleteIdea();
  editIdea();
  saveEditedIdea();
  upgradeIdea();
  downgradeIdea();
})


function renderIdea(idea) {
  $("#latest-ideas").append(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h3 class='title'>Title: "
    + idea.title
    + "</h3><h6 class='body'>Body: "
    + idea.body
    + "</h5><h6 class='quality' >Quality: "
    + idea.quality
    + "</h6><p>Posted at: "
    + idea.created_at
    + "</p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger'>Delete</button>"
    + "<button id='edit-idea' name='button-idea' class='btn btn-warning'>Edit</button>"
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

    var ideaParams = {
      ideaQualityChange: {
        quality: 1
      }
    }

    $.ajax({
      type:    "POST",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { _method:'PUT', ideaParams },
        success: function() {
          var newQuality = getIdeaQuality($idea.attr('data-id'))
          console.log(newQuality)
          $($idea).find('.quality').text("Quality: " + newQuality)
        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function getIdeaQuality(idea_id) {

  $.ajax({
    type:    "GET",
    url:     "api/v1/ideas/" + idea_id + ".json",
    success: function(idea) {
      return idea.quality
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}

function downgradeIdea() {
  $('#latest-ideas').delegate('#downgrade-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    var ideaParams = {
      ideaQualityChange: {
        quality: -1
      }
    }

    $.ajax({
      type:    "POST",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { _method:'PUT', ideaParams },
        success: function() {
          var newQuality = getIdeaQuality($idea.attr('data-id'))
          console.log(newQuality)
          $($idea).find('.quality').text("Quality: " + newQuality)
        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

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
      updatedIdea: {
        newTitle: $idea.find('#updated-idea-title').val(),
        newBody: $idea.find('#updated-idea-body').val()
      }
    }

    $.ajax({
      type:    "POST",
      url:     'api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { _method:'PUT', updatedIdeaParams },
        success: function() {
          var newQuality = getIdeaQuality($idea.attr('data-id'))
          console.log(newQuality)
          $($idea).find('.quality').text("Quality: " + newQuality)
        },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
  };
