class PostersController < ApplicationController
    def index 
        posters = Poster.all
    end

    def show
        poster = Poster.find(params[:id])
        render json: poster
    end

end
