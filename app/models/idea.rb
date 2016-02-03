class Idea < ActiveRecord::Base
  validates :title, :body, presence: true
  enum quality: { swill: 0, plausible: 1, genius: 2 }


end
