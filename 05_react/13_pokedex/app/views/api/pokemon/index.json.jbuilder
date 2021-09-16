json.array! @pokemon do |pokemon|
  json.extract! pokemon, :id, :name
  json.image_url asset_path("pokemon_snaps/#{pokemon.image_url}")
end
