class PostersController < ApplicationController
    def index 
        posters = Poster.all
        render json: posters, except: [:created_at, :updated_at]
    end

    def show
        poster = Poster.find_by(id: params[:id])
        if poster 
            render json: poster, except: [:created_at, :updated_at]
        else 
            render json: {message: 'Poster Not Found'}
        end 
    end

end
