class Api::PokemonController < ApplicationController
  # GET /api/pokemon
  # GET /api/pokemon.json
  def index
    @pokemon = Pokemon.all
  end

  # GET /api/pokemon/1
  # GET /api/pokemon/1.json
  def show
    @pokemon = Pokemon.includes(:moves, :items).find(params[:id])
  end

  # POST /api/pokemon
  # POST /api/pokemon.json
  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.moves = params[:pokemon][:moves].map do |move|
      Move.find_or_initialize_by(name: move)
    end

    if @pokemon.save
      render :show, status: :created, location: api_pokemon_url(@pokemon)
    else
      render json: @pokemon.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PUT /api/pokemon/1
  # PUT /api/pokemon/1.json
  def update
    @pokemon = Pokemon.find(params[:pokemon][:id])
    @pokemon.moves = params[:pokemon][:moves].map do |move|
      Move.find_or_initialize_by(name: move)
    end

    if @pokemon.update(pokemon_params)
      render :show, status: :created, location: api_pokemon_url(@pokemon)
    else
      render json: @pokemon.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def pokemon_params
      params.require(:pokemon).permit(:name, :attack, :defense, :poke_type, :image_url)
    end
end
