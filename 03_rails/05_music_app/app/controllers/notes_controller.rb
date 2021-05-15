class NotesController < ApplicationController
  before_action :require_login
  before_action :require_author, only: [:destroy]

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    @note.save
    redirect_to track_url(@note.track_id)
  end

  def destroy
    @note = Note.find(params[:id]).destroy
    redirect_to track_url(@note.track_id)
  end

  private
  def note_params
    params.require(:note).permit(:note, :track_id)
  end

  def require_author
    unless current_user.notes.exists(params[:id])
      redirect_to root_url
    end
  end
end
