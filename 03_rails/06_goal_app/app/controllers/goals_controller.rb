class GoalsController < ApplicationController
  before_action :set_user, only: [:new, :create]
  before_action :set_goal, only: [:show, :update, :destroy]
  before_action -> { require_logged_in_as(@user) }, only: [:new, :create]
  before_action -> { require_logged_in_as(@goal.user) }, only: [:update, :destroy]

  # GET goals/1
  def show
  end

  # GET users/1/goals/new
  def new
    @goal = @user.goals.build
  end

  # POST users/1/goals
  def create
    @goal = @user.goals.build(goal_params)

    if @goal.save
      redirect_to(@goal)
    else
      render action: 'new'
    end
  end

  # PUT goals/1
  def update
    @goal.update(goal_params)
    redirect_back(fallback_location: root_url)
  end

  # DELETE goals/1
  def destroy
    @goal.destroy

    redirect_to user_url(@goal.user)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_goal
      @goal = Goal.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def goal_params
      params.require(:goal).permit(:title, :details, :private, :completed)
    end
end
