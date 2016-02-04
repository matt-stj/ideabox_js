ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'minitest/pride'

class ActiveSupport::TestCase
  include Capybara::DSL
  fixtures :all
end

class ActionDispatch::IntegrationTest
DatabaseCleaner.strategy = :transaction

  def setup
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end

  def create_idea(title, body)
    visit "/"

    fill_in 'form-idea-title', :with => title
    fill_in 'form-idea-body', :with => body
    click_link_or_button('save-idea')
  end

  def delete_newest_idea
    first('.idea').click_link_or_button('Delete')
  end

end


class ActionController::TestCase
  def json_response
    JSON.parse(response.body)
  end
end
