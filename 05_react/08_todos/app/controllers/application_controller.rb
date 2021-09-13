class ApplicationController < ActionController::API
  include ActionController::Helpers

  helper_method :current_user
  helper_method :logged_in?

  def logged_in?
    session[:user_id] != nil
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

  def require_logged_in
    unless logged_in?
      redirect_to login_url
    end
  end
end
