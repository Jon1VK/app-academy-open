# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  password_digest :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_username  (username) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryBot.build(:user) }

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:password).is_at_least(6) }

    context "when loaded from a db" do
      subject do
        FactoryBot.create(:user)
        User.first
      end

      it 'is expected to have :password set to <nil> and to be still valid' do
        expect(subject.password).to be_nil
        expect(subject).to be_valid
      end
    end
  end
end
