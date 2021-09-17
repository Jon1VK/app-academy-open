json.extract! pokemon, :id, :name, :attack, :defense, :poke_type
json.partial! 'image_url', pokemon: pokemon
