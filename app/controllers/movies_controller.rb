class MoviesController < ApplicationController
    def index 
        movies = Movie.all, except: [:created_at, :updated_at]
    end

    def show
        movie = Movie.find(params[:id])
        render json: movie, except: [:created_at, :updated_at]
    end

end
