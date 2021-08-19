class UsersController < ApplicationController
  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      redirect_to root_url, notice: 'User was successfully created.'
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
