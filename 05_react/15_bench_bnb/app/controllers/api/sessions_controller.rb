class Api::SessionsController < ApplicationController
  # POST /sessions
  # POST /sessions.json
  def create
    @user = User.find_by(username: params[:user][:username])

    if @user&.authenticate(params[:user][:password])
      login(@user)
      render 'api/users/show', status: :accepted
    else
      render json: { error: 'Invalid credentials'}, status: :not_found
    end
  end

  # DELETE /sessions/1
  # DELETE /sessions/1.json
  def destroy
    logout
    render json: {}
  end
end
