class Poster < ApplicationRecord
  belongs_to :movie
  belongs_to :genre
end
