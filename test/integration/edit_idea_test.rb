require 'test_helper'

class EditIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :timestamp

  def setup
    DatabaseCleaner.start
    Capybara.current_driver = :selenium
    @timestamp = Time.now
    visit "/"

    fill_in 'form-idea-title', :with => "NewTitle #{timestamp}"
    fill_in 'form-idea-body', :with => "NewBody #{timestamp}"
    click_link_or_button('save-idea')
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can edit idea' do

    within('#latest-ideas') do
      assert page.has_content?("NewTitle #{timestamp}")
      assert page.has_content?("NewBody #{timestamp}")
    end

    assert_equal Idea.last.title, "NewTitle #{timestamp}"
    assert_equal Idea.last.body, "NewBody #{timestamp}"

    first('.idea').click_link_or_button('Edit')
    fill_in 'updated-idea-title', :with => "NewTitle #{timestamp} - edited"
    fill_in 'updated-idea-body', :with => "NewBody #{timestamp} - edited"
    click_link_or_button('update-idea')

    within('#latest-ideas') do
      assert page.has_content?("NewTitle #{timestamp} - edited")
      assert page.has_content?("NewBody #{timestamp} - edited")
    end

    assert_equal Idea.last.title, "NewTitle #{timestamp} - edited"
    assert_equal Idea.last.body, "NewBody #{timestamp} - edited"
  end

end
