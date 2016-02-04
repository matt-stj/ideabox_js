require 'test_helper'

class DowngradeIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :timestamp
  attr_accessor :idea

  def setup
    Capybara.current_driver = :selenium
    @timestamp = Time.now
    visit "/"

    fill_in 'form-idea-title', :with => "NewTitle #{@timestamp}"
    fill_in 'form-idea-body', :with => "NewBody #{@timestamp}"
    click_link_or_button('save-idea')

    sleep(2)

    @idea = Idea.find_by(title: "NewTitle #{@timestamp}")
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can downgrade idea' do

    within('#latest-ideas') do
      assert page.has_content?("NewTitle #{timestamp}")
      assert page.has_content?("NewBody #{timestamp}")
      assert page.has_content?("Quality: swill")
    end

    assert_equal idea.title, "NewTitle #{timestamp}"
    assert_equal idea.body, "NewBody #{timestamp}"
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
  end
end
