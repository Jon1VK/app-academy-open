class SessionsController < ApplicationController
  # GET /sessions/new
  def new
  end

  # POST /sessions
  def create
    @user = User.find_by(username: params[:user][:username])

    if @user.authenticate(params[:user][:password])
      login(@user)
      redirect_to root_url, notice: "User #{@user.username} was successfully logged in."
    else
      flash.now[:login_error] = 'Invalid username and password combination.'
      render :new
    end
  end

  # DELETE /sessions
  def destroy
    logout
    redirect_to root_url, notice: "You were successfully logged out."
  end

  private
    # Only allow a list of trusted parameters through.
    def session_params
      params.require(:user).permit(:username, :password)
    end
end
