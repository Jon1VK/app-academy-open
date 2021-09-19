class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

  def logged_in?
    !session[:user_id].nil?
  end

  def current_user
    return nil unless logged_in?
    @current_user ||= User.find(session[:user_id])
  end

  def login(user)
    session[:user_id] = user.id
  end

  def logout
    session[:user_id] = nil
  end
end
