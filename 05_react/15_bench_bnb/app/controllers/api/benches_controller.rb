class Api::BenchesController < ApplicationController
  # GET /benches
  # GET /benches.json
  def index
    @benches = Bench.filter_by(
      bounds: params[:bounds],
      min_seats: params[:min_seats],
      max_seats: params[:max_seats]
    )
  end
  
  def show
    @bench = Bench.find(params[:id])
  end

  # POST /benches
  # POST /benches.json
  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show, status: :created
    else
      render json: helpers.full_error_messages(@bench.errors), status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def bench_params
      params.require(:bench).permit(:description, :seats, :lat, :lon)
    end
end
