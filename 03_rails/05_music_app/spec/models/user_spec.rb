require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { User.create(email: 'joni@example.com', password: '123456') }

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should have_secure_password }
  it { should validate_length_of(:password).is_at_least(6) }
end
