class UsersController < ApplicationController
  # GET /users
  def index
    @users = User.all
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user
    else
      render :new
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
