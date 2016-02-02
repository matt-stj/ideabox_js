class Idea < ActiveRecord::Base
  enum quality: { swill: 0, plausible: 1, genius: 2 }

  def update_idea(params)
    if params["ideaParams"]
      incoming_quality = params[:ideaParams][:ideaQualityChange][:quality].to_i
      increment!(incoming_quality)
    else
      update_attributes(title: params[:updatedIdeaParams][:updatedIdea][:newTitle],
                        body: params[:updatedIdeaParams][:updatedIdea][:newBody])
    end
  end

  def increment!(value)
    update_attributes(quality: Idea.qualities.fetch(self.quality) + value)
  end
end
