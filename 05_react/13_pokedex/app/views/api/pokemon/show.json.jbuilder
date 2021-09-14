json.pokemon @pokemon, partial: 'pokemon', as: :pokemon

json.moves do
  @pokemon.moves.each do |move|
    json.partial! move
  end
end

json.items do
  @pokemon.items.each do |item|
    json.partial! item
  end
end
