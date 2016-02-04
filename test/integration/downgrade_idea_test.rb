require 'test_helper'

class DowngradeIdeaTest < ActionDispatch::IntegrationTest

  def setup
    Capybara.current_driver = :selenium
    create_idea("DowngradeableIdea-Title", "DowngradeableIdea-Body")

    @idea = Idea.find_by(title: "DowngradeableIdea-Title")
  end

  test 'test user can downgrade idea' do
    idea = Idea.find_by(title: "DowngradeableIdea-Title")

    within('#latest-ideas') do
      assert page.has_content?("DowngradeableIdea-Title")
      assert page.has_content?("DowngradeableIdea-Body")
      assert page.has_content?("Quality: swill")
    end

    assert_equal idea.title, "DowngradeableIdea-Title"
    assert_equal idea.body, "DowngradeableIdea-Body"
    assert_equal idea.quality, "swill"

    first('.idea').click_link_or_button('upgrade-idea')
    assert_equal idea.reload.quality, "plausible"


    first('.idea').click_link_or_button('downgrade-idea')
    assert_equal idea.reload.quality, "swill"

    first_idea = first('.idea')

    within(first_idea) do
      assert page.has_content?("Quality: swill")
    end

    most_recently_updated_idea = Idea.order(:updated_at).last

    assert_equal most_recently_updated_idea.quality, "swill"

    delete_newest_idea
  end
end
