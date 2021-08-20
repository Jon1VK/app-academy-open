class CommentsController < ApplicationController
  before_action :require_logged_in, only: :create

  # GET /comments/1
  def show
    @comment = Comment.find(params[:id])
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)
    @comment.author = current_user

    if @comment.save
      redirect_back fallback_location: root_url, notice: 'Comment was successfully created.'
    else
      render :new
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:content, :post_id, :parent_comment_id)
    end
end
