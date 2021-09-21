class Api::ReviewsController < ApplicationController
  # GET benches/1/reviews
  # GET benches/1/reviews.json
  def index
    @reviews = Bench.find(params[:bench_id]).reviews.includes(:user)
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render :show, status: :created
    else
      render json: helpers.full_error_messages(@review.errors), status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def review_params
      params.require(:review).permit(:rating, :comment, :bench_id)
    end
end
