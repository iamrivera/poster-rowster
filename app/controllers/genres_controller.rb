class GenresController < ApplicationController
    def index
        genres = Genre.all
        render json: genres, except: [:created_at, :updated_at]
    end

    def create
        # byebug 
        genre = Genre.new(genre_params) 
        if genre.save
            render json: {message: 'Genre Created Successfully'}
        else
            render json: {message: 'Try Again'}
        end
    end


    def show 
        genre = Genre.find_by(id: params[:id])
        if genre
            render json: genre, include: [:movies, :posters], except: [:created_at, :updated_at]
        else 
            render json: {message: 'Genre Not Found'}
        end
    end

    def genre_movies
        # byebug
        genre = Genre.find_by(id: params[:id])
        movies = genre.movies
        if genre && movies 
            render json: movies
        else 
            render json: {message: 'Movies Not Found'}
        end
    end

    def genre_params
        params.require(:genre).permit(:title, :glynk)
    end


end
