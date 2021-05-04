class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

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
end
