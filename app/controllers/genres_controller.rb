class GenresController < ApplicationController
    def index
        genres = Genre.all
        render json: genres, except: [:created_at, :updated_at]
    end

    def show 
        genre = Genre.find(params[:id])
        render json: genre, except: [:created_at, :updated_at]
    end


end
