class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :logged_in_as

  def login(user)
    @current_user = user
    session[:user_id] = user.id
  end

  def logout
    session[:user_id] = nil
    redirect_to root_url
  end

  def current_user
    return nil if session[:user_id].nil?
    @current_user ||= User.find(session[:user_id])
  end

  def logged_in_as(user)
    current_user == user
  end

  def require_current_user
    redirect_to login_url if current_user.nil?
  end

  def require_logged_in_as(user)
    redirect_back(fallback_location: root_url) unless logged_in_as(user)
  end
end
