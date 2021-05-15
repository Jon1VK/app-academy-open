class TracksController < ApplicationController
  before_action :require_login
  
  def show
    @track = Track.find(params[:id])
    render :show
  end

  def new
    @track = Track.new(flash[:track])
    @track.album_id = params[:album_id]
    render :new
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      redirect_to track_url(@track)
    else
      flash[:track] = @track
      set_flash_errors(@track)
      redirect_to new_album_track_url(album_id: @track.album_id)
    end
  end

  def edit
    @track = Track.find(params[:id])
    @track.attributes = flash[:track] if flash[:track]
    render :edit
  end

  def update
    @track = Track.find(params[:id])
    if @track.update(track_params)
      redirect_to track_url(@track)
    else
      flash[:track] = @track
      set_flash_errors(@track)
      redirect_to edit_track_url(@track)
    end
  end

  def destroy
    @track = Track.find(params[:id]).destroy
    redirect_to album_url(@track.album)
  end

  private
  def track_params
    params.require(:track).permit(:title, :order, :bonus, :lyrics, :album_id)
  end
end
