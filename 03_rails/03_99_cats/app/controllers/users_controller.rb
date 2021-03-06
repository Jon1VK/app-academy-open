class UsersController < ApplicationController
  before_action :require_logged_out

  def new
    render :new
  end

  def create
    user = User.new(user_params)

    if user.save
      login_user(user)
      msg = UserMailer.welcome_email(user)
      msg.deliver_now
      redirect_to root_url
    else
      render :new
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end