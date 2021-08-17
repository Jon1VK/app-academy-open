feature "Homepage", type: :feature do
  scenario 'has an Apply link' do
    visit '/'
    expect(page).to have_content 'Learn More'
  end
end
