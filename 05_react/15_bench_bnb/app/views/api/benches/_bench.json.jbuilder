json.extract! bench, :id, :description, :seats, :lat, :lon

if bench.image.attached?
  json.image_url url_for(bench.image)
else
  json.image_url asset_url('img.jpg')
end