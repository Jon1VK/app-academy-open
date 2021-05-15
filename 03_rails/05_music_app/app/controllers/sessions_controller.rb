class SessionsController < ApplicationController
  before_action :require_not_logged_in, except: [:destroy]

  def new
    render :new
  end

  def create
    user = User.find_by(email: params[:user][:email])
    if user.authenticate(params[:user][:password])
      login(user)
      redirect_to root_url
    else
      flash[:errors][:invalid_auth] = "Invalid username and/or password."
      redirect_to new_session_url
    end
  end

  def destroy
    logout
    redirect_to new_session_url
  end
end
