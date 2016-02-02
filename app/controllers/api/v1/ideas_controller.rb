class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    @idea = Idea.new(idea_params)

    if @idea.save
      respond_with :api, :v1, @idea
    else
      # how to handle AJAX error?
    end
  end

  def destroy
    Idea.find(params[:id]).destroy
    render :nothing => true
  end

  def update
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end


end
