class MoviesController < ApplicationController
    def index 
        movies = Movie.all
        render json: movies, except: [:created_at, :updated_at]
    end

    def show
        movie = Movie.find_by(id: params[:id]) #use find by otherwise find will bot allow if statement to function properly
        if movie 
            render json: movie, except: [:created_at, :updated_at]
        else 
            render json: {message: 'Movie Not Found'}
        end
    end

    def movie_posters
        # byebug
        movie = Movie.find_by(id: params[:id])
        posters = movie.posters
        if movie && posters
            render json: posters
        else 
            render json: {message: 'Posters Not Found'}
        end
    end

end
