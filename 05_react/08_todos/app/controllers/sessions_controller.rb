class SessionsController < ApplicationController
  def new
    render :new
  end

  # POST /sessions
  def create
    @user = User.find_by(username: params[:user][:username])

    if @user&.authenticate(params[:user][:password])
      login(@user)
      redirect_to root_url
    else
      render :new
    end
  end

  # DELETE /sessions
  def destroy
    logout
    redirect_to login_url
  end

  private
end
