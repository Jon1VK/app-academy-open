class Api::ApiController < ActionController::API
  def logged_in?
    session[:user_id] != nil
  end

  def current_user
    return nil unless logged_in?
    @current_user ||= User.find(session[:user_id])
  end
end
