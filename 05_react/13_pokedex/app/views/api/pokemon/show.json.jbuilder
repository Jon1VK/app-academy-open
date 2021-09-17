json.pokemon @pokemon, partial: 'pokemon', as: :pokemon

if @pokemon.moves.empty?
  json.set! :moves, {}
else
  json.moves do
    @pokemon.moves.each do |move|
      json.partial! move
    end
  end
end

if @pokemon.items.empty?
  json.set! :items, {}
else
  json.items do
    @pokemon.items.each do |item|
      json.partial! item
    end
  end
end

