require 'test_helper'

class UpgradeIdeaTest < ActionDispatch::IntegrationTest
  attr_reader :idea

  def setup
    Capybara.current_driver = :selenium
    create_idea("UpgradeableIdea - title", "UpgradeableIdea - body")

    @idea = Idea.find_by(title: "UpgradeableIdea - title")
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'test user can upgrade idea' do

    within('#latest-ideas') do
      assert page.has_content?("UpgradeableIdea - title")
      assert page.has_content?("UpgradeableIdea - body")
      assert page.has_content?("Quality: swill")
    end

    assert_equal @idea.title, "UpgradeableIdea - title"
    assert_equal @idea.body, "UpgradeableIdea - body"
    assert_equal @idea.quality, "swill"

    first('.idea').click_link_or_button('upgrade-idea')

    first_idea = first('.idea')

    within(first_idea) do
      assert page.has_content?("Quality: plausible")
    end

    most_recently_updated_idea = Idea.order(:updated_at).last

    assert_equal most_recently_updated_idea.quality, "plausible"
    delete_newest_idea
  end


    test 'test user cant upgrade idea beyon genius' do

      within('#latest-ideas') do
        assert page.has_content?("UpgradeableIdea - title")
        assert page.has_content?("UpgradeableIdea - body")
        assert page.has_content?("Quality: swill")
      end

      assert_equal @idea.title, "UpgradeableIdea - title"
      assert_equal @idea.body, "UpgradeableIdea - body"
      assert_equal @idea.quality, "swill"

      first('.idea').click_link_or_button('upgrade-idea')

      first_idea = first('.idea')

      within(first_idea) do
        assert page.has_content?("Quality: plausible")
      end

      first('.idea').click_link_or_button('upgrade-idea')

      first_idea = first('.idea')

      within(first_idea) do
        assert page.has_content?("Quality: genius")
      end

      first('.idea').click_link_or_button('upgrade-idea')

      first_idea = first('.idea')

      within(first_idea) do
        assert page.has_content?("Quality: genius")
      end

      most_recently_updated_idea = Idea.order(:updated_at).last

      assert_equal most_recently_updated_idea.quality, "genius"
      delete_newest_idea
    end
end
