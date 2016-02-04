require 'test_helper'

class EditIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :idea

  def setup
    Capybara.current_driver = :selenium
    create_idea("EditableIdea - title", "EditableIdea - body")

    @idea = Idea.find_by(title: "EditableIdea - title")
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can edit idea' do

    within('#latest-ideas') do
      assert page.has_content?("EditableIdea - title")
      assert page.has_content?("EditableIdea - body")
    end

    assert_equal idea.title, "EditableIdea - title"
    assert_equal idea.body, "EditableIdea - body"

    first('.idea').click_link_or_button('Edit')
    fill_in 'updated-idea-title', :with => "EditableIdea - title - edited"
    fill_in 'updated-idea-body', :with => "EditableIdea - body - edited"
    click_link_or_button('update-idea')

    within('#latest-ideas') do
      assert page.has_content?("EditableIdea - title - edited")
      assert page.has_content?("EditableIdea - body - edited")
    end

    assert_equal idea.reload.title, "EditableIdea - title - edited"
    assert_equal idea.reload.body, "EditableIdea - body - edited"

    delete_newest_idea
  end

end
