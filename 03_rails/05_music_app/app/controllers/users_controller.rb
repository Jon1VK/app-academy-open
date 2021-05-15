class UsersController < ApplicationController
  # before_action :require_not_logged_in
  
  def new
    @user = User.new(flash[:user])
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to root_url
    else
      flash[:user] = @user
      set_flash_errors(@user)
      redirect_to new_user_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end