require 'test_helper'

class UpgradeIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :timestamp, :idea

  def setup
    Capybara.current_driver = :selenium
    @timestamp = Time.now
    visit "/"

    fill_in 'form-idea-title', :with => "NewTitle #{@timestamp}"
    fill_in 'form-idea-body', :with => "NewBody #{@timestamp}"
    click_link_or_button('save-idea')

    @idea = Idea.find_by(title: "NewTitle #{@timestamp}")
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

    assert_equal @idea.title, "NewTitle #{timestamp}"
    assert_equal @idea.body, "NewBody #{timestamp}"
    assert_equal @idea.quality, "swill"

    first('.idea').click_link_or_button('upgrade-idea')

    first_idea = first('.idea')

    within(first_idea) do
      assert page.has_content?("Quality: plausible")
    end

    most_recently_updated_idea = Idea.order(:updated_at).last

    assert_equal most_recently_updated_idea.quality, "plausible"
  end
end
