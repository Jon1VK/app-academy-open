guests = @guests.where(age: 40..50)

json.array! guests, partial: 'guest', as: :guest