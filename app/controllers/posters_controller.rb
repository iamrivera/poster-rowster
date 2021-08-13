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

    def add_vote
        # byebug Id is not aligned find by 10 give post id of 1 
        poster = Poster.find_by(params[:id]) 
        if poster
            poster.votes += 1
            poster.save
            render json: {message: 'Thanks for Voting', votes: poster.votes}
        else
            render json: {message: 'Try again'}
        end
    end

end
