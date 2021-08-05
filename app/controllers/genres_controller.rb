class GenresController < ApplicationController
    def index
        genres = Genre.all
        render json: genres, except: [:created_at, :updated_at]
    end

    def show 
        genre = Genre.find_by(id: params[:id])
        if genre
            render json: genre, except: [:created_at, :updated_at]
        else 
            render json: {message: 'Genre Not Found'}
        end
    end


end
