# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  completed  :boolean          default(FALSE)
#  details    :text
#  private    :boolean          default(FALSE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_goals_on_user_id            (user_id)
#  index_goals_on_user_id_and_title  (user_id,title) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Goal, type: :model do
  subject { FactoryBot.build(:goal) }

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_uniqueness_of(:title).scoped_to(:user_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
  end
end
