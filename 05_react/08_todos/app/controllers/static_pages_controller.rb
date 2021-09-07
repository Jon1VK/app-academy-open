class StaticPagesController < ApplicationController
  include ActionView::Layouts

  def index
    render :index
  end
end
