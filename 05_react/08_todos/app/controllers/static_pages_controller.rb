class StaticPagesController < ApplicationController
  include ActionView::Layouts

  before_action :require_logged_in

  def index
    render :index
  end
end
