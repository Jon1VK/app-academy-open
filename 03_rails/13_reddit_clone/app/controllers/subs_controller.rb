class SubsController < ApplicationController
  before_action :set_sub, only: [:show, :edit, :update]
  before_action :require_logged_in, except: [:index, :show]
  before_action only: [:edit, :update] do
    require_logged_in_as(@sub.moderator)
  end

  # GET /subs
  def index
    @subs = Sub.all
  end

  # GET /subs/1
  def show
  end

  # GET /subs/new
  def new
    @sub = Sub.new
  end

  # GET /subs/1/edit
  def edit
  end

  # POST /subs
  def create
    @sub = Sub.new(sub_params)
    @sub.moderator = current_user

    if @sub.save
      redirect_to @sub, notice: 'Sub was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /subs/1
  def update
    if @sub.update(sub_params)
      redirect_to @sub, notice: 'Sub was successfully updated.'
    else
      render :edit
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sub
      @sub = Sub.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sub_params
      params.require(:sub).permit(:title, :description)
    end
end
