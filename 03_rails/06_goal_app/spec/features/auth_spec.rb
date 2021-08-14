require 'rails_helper'

def sign_up(user)
  visit signup_url
  fill_in "Username",	with: user.username
  fill_in "Password",	with: user.password
  click_button 'Sign Up'
end

def log_in(user)
  visit login_url
  fill_in "Username",	with: user.username
  fill_in "Password",	with: user.password
  click_button 'Log In'
end

feature 'the signup process' do
  scenario 'has a new user page' do
    visit signup_url
    expect(page).to have_button 'Sign Up'
  end

  feature 'signing up a user' do

    scenario 'shows username on the homepage after signup' do
      user = FactoryBot.build(:user)
      sign_up(user)

      expect(page).to have_content("#{user.username}'s Profile")
    end
  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login' do
    user = FactoryBot.create(:user)
    log_in(user)

    expect(page).to have_content("#{user.username}'s Profile")
  end
end

feature 'logging out' do
  scenario 'begins with a logged out state' do
    visit root_url
    expect(page).to have_content('Log In')
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    user = FactoryBot.create(:user)
    log_in(user)
    click_on 'Log Out'
    expect(page).to_not have_content('Log Out')
  end
end
