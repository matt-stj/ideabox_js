class Idea < ActiveRecord::Base
  enum quality: { swill: 0, plausible: 1, genius: 2 }


  def increment!(value)
    update_attributes(quality: Idea.qualities.fetch(self.quality) + value)
  end
end
