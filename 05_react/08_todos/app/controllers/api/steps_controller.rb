class Api::StepsController < ApplicationController
  before_action :set_step, only: [:show, :update, :destroy]

  # GET /steps
  def index
    @steps = Step.all

    render json: @steps
  end

  # GET /steps/1
  def show
    render json: @step
  end

  # POST /steps
  def create
    @step = Step.new(step_params)

    if @step.save
      render json: @step, status: :created, location: api_step_url(@step)
    else
      render json: @step.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /steps/1
  def update
    if @step.update(step_params)
      render json: @step
    else
      render json: @step.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /steps/1
  def destroy
    render json: @step.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_step
      @step = Step.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def step_params
      params.require(:step).permit(:title, :done, :todo_id)
    end
end
