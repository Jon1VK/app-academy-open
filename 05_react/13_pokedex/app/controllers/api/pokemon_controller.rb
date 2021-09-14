class Api::PokemonController < ApplicationController
  # GET /api/pokemon
  # GET /api/pokemon.json
  def index
    @pokemon = Pokemon.all
  end

  # GET /api/pokemon/1
  # GET /api/pokemon/1.json
  def show
    @pokemon = Pokemon.find(params[:id])
  end

  # POST /api/pokemon
  # POST /api/pokemon.json
  def create
    @pokemon = Pokemon.new(pokemon_params)

    if @pokemon.save
      render :show, status: :created, location: @pokemon
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def pokemon_params
      params.require(:pokemon).permit(:name, :attack, :defense, :poke_type, :image_url)
    end
end
