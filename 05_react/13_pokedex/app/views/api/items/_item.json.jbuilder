json.set! item.id do
  json.extract! item, :id, :pokemon_id, :name, :price, :happiness
  json.image_url asset_path(item.image_url)
end
