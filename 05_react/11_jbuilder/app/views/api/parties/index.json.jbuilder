json.array! @parties do |party|
  json.partial! party
  json.guests party.guests, partial: 'api/guests/guest', as: :guest
end