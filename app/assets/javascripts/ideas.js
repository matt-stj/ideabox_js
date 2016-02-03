$(document).ready(function() {
  fetchIdeas();
  createIdea();
  deleteIdea();
  editIdea();
  saveEditedIdea();
  upgradeIdea();
  downgradeIdea();
  searchBar();
})

var qualityValues = {
  swill: 0,
  plausible: 1,
  genius: 2
}

var qualityTexts = {
  0: "swill",
  1: "plausible",
  2: "genius"
}

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

function fetchIdeas() {
  var newestItemID = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type:    "GET",
    crossDomain: true,
    url:     "api/v1/ideas.json",
    success: function(ideas) {
      //  let rails do sorting
      var sortedIdeas = ideas.sort(function(a,b){
        return new Date(a.created_at) - new Date(b.created_at);
      });

      $.each(sortedIdeas, function(index, idea) {
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

    var $quality = $idea.find('.idea-quality');
    var qualityText = $quality.text();
    var qualityValue = qualityValues[qualityText];

    if (qualityValue < 2) { qualityValue++; }

    $.ajax({
      type:    "PUT",
      url:     '/api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { idea: { quality: qualityValue } },
      success: function () { $quality.text(qualityTexts[qualityValue]); },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function downgradeIdea() {
  $('#latest-ideas').delegate('#downgrade-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    var $quality = $idea.find('.idea-quality');
    var qualityText = $quality.text();
    var qualityValue = qualityValues[qualityText];

    if (qualityValue > 0) { qualityValue--; }

    $.ajax({
      type:    "PUT",
      url:     '/api/v1/ideas/' + $idea.attr('data-id') + ".json",
      data:    { idea: { quality: qualityValue } },
      success: function () { $quality.text(qualityTexts[qualityValue]); },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}


// function getIdeaQuality(idea_id) {
//   var newQuality = ""
//
//   $.ajax({
//     type:    "GET",
//     url:     "api/v1/ideas/" + idea_id + ".json",
//     success: function(idea) {
//       return newQuality = idea.quality
//     },
//     error: function(xhr) {
//       console.log(xhr.responseText)
//     }
//   })
//   return newQuality
// }

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


  function searchBar() {

  $("#search").on("keypress", function (e) {
    if (e.keyCode == 13) {
      return false;
    }
  });

  $("#search").on("keyup", function() {
    var filter = $(this).val();
    var ideas = $("#latest-ideas").children()
    $.each(ideas, function(){
      if ($(this).find('#idea-title, #idea-body').text().search(new RegExp(filter, "i")) === -1) {
        $(this).addClass("invisible")
      }
      else {
        $(this).removeClass("invisible")
      }
    })
  })
}
