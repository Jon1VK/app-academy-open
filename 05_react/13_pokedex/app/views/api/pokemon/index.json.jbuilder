json.array! @pokemon do |pokemon|
  json.extract! pokemon, :id, :name
  json.partial! 'image_url', pokemon: pokemon
end
