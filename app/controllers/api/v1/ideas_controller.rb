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
      render :nothing => true
    end
  end

  def destroy
    Idea.find(params[:id]).destroy
    render :nothing => true
  end

  def update
    respond_with Idea.find(params[:id]).update(idea_params)
  end

  def show
    respond_with Idea.find_by(id: params[:id])
  end

  private

  def idea_params
    params[:idea][:quality] = params[:idea][:quality].to_i
    params.require(:idea).permit(:title, :body, :quality)
  end


end
