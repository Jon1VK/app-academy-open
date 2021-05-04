class SessionsController < ApplicationController
  before_action :require_logged_out, except: :destroy

  def new
    render :new
  end

  def create
    user = User.find_by(username: params[:user][:username])

    if user.authenticate(params[:user][:password])
      login_user(user)
      redirect_to root_url
    else
      render :new
    end
  end

  def destroy
    logout_user
    redirect_to new_session_url
  end
end