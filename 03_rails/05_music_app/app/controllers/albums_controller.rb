class AlbumsController < ApplicationController
  before_action :require_login
  
  def show
    @album = Album.find(params[:id])
    render :show
  end

  def new
    @album = Album.new(flash[:album])
    @album.band_id = params[:band_id]
    render :new
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to album_url(@album)
    else
      flash[:album] = @album
      set_flash_errors(@album)
      redirect_to new_band_album_url(band_id: @album.band_id)
    end
  end

  def edit
    @album = Album.find(params[:id])
    @album.attributes = flash[:album] if flash[:album]
    render :edit
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      redirect_to album_url(@album)
    else
      flash[:album] = @album
      set_flash_errors(@album)
      redirect_to edit_album_url(@album)
    end
  end

  def destroy
    @album = Album.find(params[:id]).destroy
    redirect_to band_url(@album.band)
  end

  private
  def album_params
    params.require(:album).permit(:title, :year, :live, :band_id)
  end
end
