class ApplicationController < ActionController::Base
  helper_method :logged_in?
  helper_method :current_user
  helper_method :owner_of_the_cat?

  private

  def logged_in?
    !session[:user_id].nil?
  end

  def current_user
    return nil if !logged_in?
    @user ||= User.find(session[:user_id])
  end

  def login_user(user)
    session[:user_id] = user.id
  end

  def logout_user
    session.delete(:user_id)
  end

  def require_logged_out
    redirect_to root_url if logged_in?
  end

  def require_logged_in
    redirect_to new_session_url if !logged_in?
  end

  def owner_of_the_cat?
    logged_in? && current_user.cats.exists?(params[:id])
  end

  def owner_of_the_requested_cat?
    logged_in? && CatRentalRequest.find(params[:id]).cat.owner == current_user
  end

  def require_owner_of_the_cat
    redirect_to root_url unless owner_of_the_cat?
  end

  def require_owner_of_the_requested_cat
    redirect_to root_url unless owner_of_the_requested_cat?
  end
end
