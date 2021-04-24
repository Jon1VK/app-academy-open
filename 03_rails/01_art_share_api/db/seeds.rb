# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create!(username: "Joni")
u2 = User.create!(username: "Elli")
u3 = User.create!(username: "Matti")

a1 = Artwork.create!(artist: u1, title: "Artwork 1", image_url: 'URL')
a2 = Artwork.create!(artist: u1, title: "Artwork 2", image_url: 'URL')
a3 = Artwork.create!(artist: u2, title: "Artwork 3", image_url: 'URL')

as1 = ArtworkShare.create!(artwork: a1, viewer: u2)
as2 = ArtworkShare.create!(artwork: a1, viewer: u3)
as3 = ArtworkShare.create!(artwork: a2, viewer: u2)
