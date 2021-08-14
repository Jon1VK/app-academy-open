class SessionsController < ApplicationController
  # GET /sessions/new
  def new
  end

  # POST /sessions
  def create
    username = params[:user][:username]
    password = params[:user][:password]
    user = User.find_by(username: username)&.authenticate(password)

    if user
      login(user)
      redirect_to root_url
    else
      flash.now[:login_error] = 'Invalid username and password combination'
      render :new
    end
  end

  # DELETE /sessions
  def destroy
    logout
  end
end
