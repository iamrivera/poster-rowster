class PostersController < ApplicationController
    def index 
        posters = Poster.all
        render json: posters, except: [:created_at, :updated_at]
    end

    def show
        poster = Poster.find(params[:id])
        render json: poster, except: [:created_at, :updated_at]
    end

end
