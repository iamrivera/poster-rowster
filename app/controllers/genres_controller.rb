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

    def genre_params
        params.require(:genre).permit(:title)
    end


end
