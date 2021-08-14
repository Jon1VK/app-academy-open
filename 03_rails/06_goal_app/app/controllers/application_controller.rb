class ApplicationController < ActionController::Base
  helper_method :current_user

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
end
