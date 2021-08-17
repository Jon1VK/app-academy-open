class CommentsController < ApplicationController
  before_action :require_current_user
  # POST /comments
  def create
    @comment = @current_user.authored_comments.build(comment_params)

    if @comment.save
      redirect_to @comment.commentable
    else
      redirect_back(fallback_location: root_url)
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:content, :commentable_id, :commentable_type)
    end
end
