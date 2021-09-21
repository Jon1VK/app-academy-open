# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  comment    :string
#  rating     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  bench_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_reviews_on_bench_id              (bench_id)
#  index_reviews_on_user_id               (user_id)
#  index_reviews_on_user_id_and_bench_id  (user_id,bench_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (bench_id => benches.id)
#  fk_rails_...  (user_id => users.id)
#
class Review < ApplicationRecord
  belongs_to :user
  belongs_to :bench

  validates :rating, presence: true, numericality: { greater_than: 0, less_than: 6 }
  validates :user_id, uniqueness: { scope: :bench_id }
end
