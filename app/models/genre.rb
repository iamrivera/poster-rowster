class Genre < ApplicationRecord
    has_many :movies
    has_many :posters, through: :movies
end
