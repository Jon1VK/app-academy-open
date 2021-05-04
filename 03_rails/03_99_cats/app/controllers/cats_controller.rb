class CatsController < ApplicationController
  before_action :require_logged_in, except: [:index, :show]
  before_action :require_owner_of_the_cat, only: [:edit, :update]
  
  def index
    @cats = Cat.all
    render :index
  end

  def show
    @cat = Cat.find(params[:id])
    @cat_rental_requests = @cat.cat_rental_requests
      .includes(:requester).order(start_date: :asc)
    render :show
  end

  def new
    @cat = Cat.new
    render :new
  end

  def edit
    @cat = Cat.find(params[:id])
    render :edit
  end

  def create
    @cat = Cat.new(cat_params)
    @cat.owner = current_user

    if @cat.save
      redirect_to cat_url(@cat)
    else
      render :new
    end
  end

  def update
    @cat = Cat.find(params[:id])

    if @cat.update(cat_params)
      redirect_to cat_url(@cat)
    else
      render :edit
    end
  end

  private
  def cat_params
    params.require(:cat).permit(:name, :birth_date, :color, :sex, :description)
  end
end