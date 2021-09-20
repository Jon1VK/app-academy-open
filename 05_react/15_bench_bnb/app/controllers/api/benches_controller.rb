class Api::BenchesController < ApplicationController
  # GET /benches
  # GET /benches.json
  def index
    @benches = Bench.all
  end

  # POST /benches
  # POST /benches.json
  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show, status: :created
    else
      render json: full_error_messages(@bench.errors), status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def bench_params
      params.require(:bench).permit(:description, :lat, :lon)
    end
end
