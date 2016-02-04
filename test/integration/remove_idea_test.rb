require 'test_helper'

class RemoveIdeaTest < ActionDispatch::IntegrationTest

  def setup
    Capybara.current_driver = :selenium
    create_idea("RemoveNewIdea - title", "RemoveNewIdea - body")

    @idea = Idea.find_by(title: "RemoveNewIdea - title")
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can delete idea' do
    visit '/'

    within('#latest-ideas') do
      assert page.has_content?("RemoveNewIdea - title")
      assert page.has_content?("RemoveNewIdea - body")
    end

    first('.idea').click_link_or_button('Delete')

    within('#latest-ideas') do
      refute page.has_content?("RemoveNewIdea - title")
      refute page.has_content?("RemoveNewIdea - body")
    end

    refute_equal Idea.last.title, "RemoveNewIdea - title"
    refute_equal Idea.last.body, "RemoveNewIdea - body"

    delete_newest_idea
  end
end
