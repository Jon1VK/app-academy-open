class ApplicationController < ActionController::Base
  helper_method :logged_in?
  helper_method :logged_in_as?
  helper_method :current_user

  def login(user)
    session[:user_id] = user.id
  end

  def logout
    session[:user_id] = nil
  end

  def logged_in?
    !session[:user_id].nil?
  end

  def logged_in_as?(user)
    logged_in && current_user == user
  end

  def current_user
    return nil if !logged_in?
    @current_user ||= User.find(session[:user_id])
  end

  def require_logged_in
    unless logged_in?
      redirect_to login_url, notice: 'Please, login to your account to be able to use all functionality of this website.'
    end
  end

  def require_logged_in_as(user)
    require_logged_in

    unless logged_in_as?(user)
      redirect_back fallback_location: root_url
    end
  end
end
