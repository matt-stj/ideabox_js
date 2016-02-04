require 'test_helper'

class AddAndRemoveIeaTest < ActionDispatch::IntegrationTest

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can add idea' do
    Capybara.current_driver = :selenium
    timestamp = Time.now
    visit "/"

    refute page.has_content?("NewTitle #{timestamp}")
    refute page.has_content?("NewBody #{timestamp}")

    fill_in 'form-idea-title', :with => "NewTitle #{timestamp}"
    fill_in 'form-idea-body', :with => "NewBody #{timestamp}"
    click_link_or_button('save-idea')

    within('#latest-ideas') do
      assert page.has_content?("NewTitle #{timestamp}")
      assert page.has_content?("NewBody #{timestamp}")
    end

    assert_equal Idea.last.title, "NewTitle #{timestamp}"
    assert_equal Idea.last.body, "NewBody #{timestamp}"

  end

  test 'test user can delete idea' do
    Capybara.current_driver = :selenium
    timestamp = Time.now
    visit "/"


    fill_in 'form-idea-title', :with => "NewTitle2 #{timestamp}"
    fill_in 'form-idea-body', :with => "NewBody2 #{timestamp}"
    click_link_or_button('save-idea')

    within('#latest-ideas') do
      assert page.has_content?("NewTitle2 #{timestamp}")
      assert page.has_content?("NewBody2 #{timestamp}")
    end

    first('.idea').click_link_or_button('Delete')

    within('#latest-ideas') do
      refute page.has_content?("NewTitle2 #{timestamp}")
      refute page.has_content?("NewBody2 #{timestamp}")
    end

    refute_equal Idea.last.title, "NewTitle2 #{timestamp}"
    refute_equal Idea.last.body, "NewBody2 #{timestamp}"
  end
end
