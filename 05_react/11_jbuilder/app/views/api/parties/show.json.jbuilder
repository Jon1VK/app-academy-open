json.partial! @party
json.guests @party.guests do |guest|
  json.partial! guest
  json.gifts guest.gifts, partial: 'api/gifts/gift', as: :gift
end