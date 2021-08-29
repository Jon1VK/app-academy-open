// document.addEventListener("DOMContentLoaded", () => {
// Using defer keyword instead

// toggling restaurants

const toggleLi = (e) => {
  const li = e.target;
  if (li.className === 'visited') {
    li.className = '';
  } else {
    li.className = 'visited';
  }
};

document.querySelectorAll('#restaurants li').forEach((li) => {
  li.addEventListener('click', toggleLi);
});

// adding SF places as list items

const addSFPlace = (e) => {
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector('.favorite-input');
  const sfPlaces = document.getElementById('sf-places');

  const li = document.createElement('li');
  li.textContent = input.value;
  input.value = '';

  sfPlaces.append(li);
};

document
  .querySelector('.favorite-submit')
  .closest('form')
  .addEventListener('submit', addSFPlace);

// adding new photos

// --- your code here!

const togglePhotoForm = (e) => {
  const form = document.querySelector('.photo-form-container');
  form.classList.toggle('hidden');
};

document
  .querySelector('.photo-show-button')
  .addEventListener('click', togglePhotoForm);

const addPhoto = (e) => {
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector('.photo-url-input');
  const dogPhotos = document.querySelector('.dog-photos');

  const li = document.createElement('li');

  const img = document.createElement('img');
  img.src = input.value;
  input.value = '';

  li.append(img);
  dogPhotos.append(li);
};

document
  .querySelector('.photo-url-submit')
  .closest('form')
  .addEventListener('submit', addPhoto);
// });
