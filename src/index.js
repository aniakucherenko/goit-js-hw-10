import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// new SlimSelect({
//   select: '#selectElement',
// });

fetchBreeds
  .then(response => {
    const catListName = response
      .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
      .join('');

    breedSelect.innerHTML = catListName;

    fetchCatByBreed(breedSelect.value).then(response => {
      const cats = response.map(item => item.breeds[0]);

      const catElements = cats.map(
        cat => `
        <div class='wrapper'> 
          <img class="cats-img" width=500 src="${response[0].url}" alt="${cat.name}">
          <h2>${cat.name}</h2>
          <p class="cat-description">${cat.description}</p>
          <p class="cat-description">Temperament: ${cat.temperament}</p>
        </div>
      `
      );
      catInfo.innerHTML = '';

      loader.classList.remove('is-hidden');

      setTimeout(() => {
        loader.classList.add('is-hidden');
        catInfo.innerHTML = catElements.join('');
      }, 500);
      Notiflix.Notify.Failure('Error');
    });
  })
  .catch(() => {
    loader.classList.add('is-hidden');

    breedSelect.classList.remove('is-hidden');

    error.classList.add('is-hidden');
    Notiflix.Notify.Failure('Error');
  });

const breedSelection = event => {
  fetchCatByBreed(breedSelect.value).then(response => {
    const cats = response.map(item => item.breeds[0]);
    const catElements = cats.map(
      cat => `
        <div class='wrapper'> 
          <img class="cats-img" width=500 src="${response[0].url}" alt="${cat.name}">
          <h2>${cat.name}</h2>
          <p class="cat-description">${cat.description}</p>
          <p class="cat-description">Temperament: ${cat.temperament}</p>
        </div>
      `
    );

    catInfo.innerHTML = '';

    loader.classList.remove('is-hidden');

    setTimeout(() => {
      loader.classList.add('is-hidden');
      catInfo.innerHTML = catElements.join('');
    }, 500);

    Notiflix.Notify.Failure('Error');
  });
};

breedSelect.addEventListener('change', breedSelection);
