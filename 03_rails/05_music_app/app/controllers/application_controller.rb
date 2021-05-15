class ApplicationController < ActionController::Base
  helper_method :logged_in?
  helper_method :current_user

  private

  def logged_in?
    session.has_key?(:user_id)
  end

  def current_user
    return nil unless logged_in?
    @current_user ||= User.find(session[:user_id])
  end

  def login(user)
    session[:user_id] = user.id
  end

  def logout
    session.delete(:user_id)
  end

  def set_flash_errors(model)
    flash[:errors] = {}
    model.errors.messages.each do |column, messages|
      flash[:errors][column] = "#{column.capitalize} #{messages.first}"
    end
  end

  def require_login
    redirect_to new_session_url unless logged_in?
  end

  def require_not_logged_in
    redirect_to root_url if logged_in?
  end
end
