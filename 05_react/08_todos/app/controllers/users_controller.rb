class UsersController < ApplicationController
  include ActionView::Layouts

  def new
    @user = User.new
    render :new
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      login(user)
      redirect_to root_url
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
