require 'test_helper'

class AddIdeaTest < ActionDispatch::IntegrationTest

  def setup
    Capybara.current_driver = :selenium
    create_idea("AddnewIdea - title", "AddnewIdea - body")

    @idea = Idea.find_by(title: "AddnewIdea - title")
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can add idea' do
    visit '/'

    fill_in 'form-idea-title', :with => "AddnewIdea - title"
    fill_in 'form-idea-body', :with => "AddnewIdea - body"
    click_link_or_button('save-idea')

    within('#latest-ideas') do
      assert page.has_content?("AddnewIdea - title")
      assert page.has_content?("AddnewIdea - body")
    end

    idea = Idea.find_by(title: "AddnewIdea - title")

    assert_equal idea.title, "AddnewIdea - title"
    assert_equal idea.body, "AddnewIdea - body"

    delete_newest_idea
  end

end
