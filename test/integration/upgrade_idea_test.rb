require 'test_helper'

class UpgradeIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :timestamp

  def setup
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

  test 'test user can upgrade idea' do

    within('#latest-ideas') do
      assert page.has_content?("NewTitle #{timestamp}")
      assert page.has_content?("NewBody #{timestamp}")
      assert page.has_content?("Quality: swill")
    end

    assert_equal Idea.last.title, "NewTitle #{timestamp}"
    assert_equal Idea.last.body, "NewBody #{timestamp}"
    assert_equal Idea.last.quality, "swill"

    first('.idea').click_link_or_button('upgrade-idea')

    first_idea = first('.idea')

    within(first_idea) do
      assert page.has_content?("Quality: plausible")
    end

    most_recently_updated_idea = Idea.order(:created_at).last

    assert_equal most_recently_updated_idea.quality, "plausible"
  end
end
