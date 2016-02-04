require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  should validate_presence_of(:title)
  should validate_presence_of(:body)

  test 'enum values work properly' do
    qualityValues = {
      "swill" => 0,
      "plausible": 1,
      "genius": 2
    }

    idea_1 = Idea.create(title: "hi", body: "there", quality: 0)
    assert_equal "swill", idea_1.quality

    idea_2 = Idea.create(title: "hi", body: "there", quality: 1)
    assert_equal "plausible", idea_2.quality

    idea_3 = Idea.create(title: "hi", body: "there", quality: 2)
    assert_equal "genius", idea_3.quality
  end
end
