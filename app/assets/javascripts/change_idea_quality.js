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
