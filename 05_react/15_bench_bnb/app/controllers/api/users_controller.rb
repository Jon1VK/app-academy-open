class Api::UsersController < ApplicationController
  # POST /api/users
  # POST /api/users.json
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show, status: :created
    else
      render json: helpers.full_error_messages(@user.errors), status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
