require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  attr_reader :idea

    def setup
      @idea = Idea.first
    end

    test "#index responds to json" do
      get :index, format: :json
      assert_response :success
    end

    test "#index returns an array of records" do
      get :index, format: :json

      assert_kind_of Array, json_response
    end

    test "#index returns the correct number of ideas" do
      get :index, format: :json

      assert_equal Idea.count, json_response.count
    end

    test "#index contains ideas that have the correct properties" do
      get :index, format: :json

      json_response.each do |idea|
        assert idea["title"]
        assert idea["body"]
      end
    end

    test "#create adds an additional idea to the database" do
      idea = { title: "New idea", body: "Amazing Description" }

      number_of_ideas_before_adding_a_new_idea = Idea.count

      assert_response :success
      assert_difference 'Idea.count', 1 do
        post :create, format: :json, idea: idea
      end
    end

    test "#create returns an idea with the correct properties" do
      idea = { title: "New idea", body: "Amazing Description" }

      post :create, format: :json, idea: idea
      assert_equal idea[:title], json_response["title"]
      assert_equal idea[:body], json_response["body"]
    end

    test "#destroy removes an idea from the database" do
      idea = Idea.last

      number_of_ideas_before_removing_an_idea = Idea.count

      assert_response :success
      assert_difference 'Idea.count', -1, 'An Idea should be destroyed' do
        post :destroy, id: idea.id
      end
    end

    test "#show responds to json" do
    get :show, format: :json, id: idea.id

    assert_response :success
  end

  test "#show returns a hash of a single record" do
    get :show, format: :json, id: idea.id

    assert_kind_of Hash, json_response
  end

  test "#show returns the correct idea" do
    get :show, format: :json, id: idea.id

    assert_equal idea.id, json_response['id']
  end

  test "#show contains an idea with the correct properties" do
    get :show, format: :json, id: idea.id

    assert idea.title, json_response["title"]
    assert idea.body, json_response["body"]
    assert "swill", json_response["quality"]
  end

  test "#update can increment quality" do
    assert_equal "swill", idea.quality

    get :update, format: :json, id: idea.id, idea: {"quality"=>"1"}

    assert_equal "plausible", idea.reload.quality
  end

  test "#update can decrement quality" do
    idea.quality = 1

    get :update, format: :json, id: idea.id, idea: {"quality"=>"0"}

    assert_equal "swill", idea.reload.quality
  end

  test "#update can edit title" do
    idea.title = "old title"

    get :update, format: :json, id: idea.id, idea: {"title"=>"new title"}

    assert_equal "new title", idea.reload.title
  end

  test "#update can edit body" do
    idea.body = "old body"

    get :update, format: :json, id: idea.id, idea: {"body"=>"new body"}

    assert_equal "new body", idea.reload.body
  end

  test "#update can edit title and body" do
    idea.title = "old title"
    idea.body = "old body"

    get :update, format: :json, id: idea.id, idea: {"title"=>"new title", "body"=>"new body"}

    assert_equal "new title", idea.reload.title
    assert_equal "new body", idea.reload.body
  end


end
