if pokemon.image_url.start_with?('http', '/assets')
  json.image_url pokemon.image_url
else
  json.image_url asset_path("pokemon_snaps/#{pokemon.image_url}")
end