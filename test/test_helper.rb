ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'minitest/pride'

class ActiveSupport::TestCase
  include Capybara::DSL
end

class ActiveSupport::IntegrationTest
DatabaseCleaner.strategy = :transaction

  def setup
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end

end


class ActionController::TestCase
  def json_response
    JSON.parse(response.body)
  end
end
