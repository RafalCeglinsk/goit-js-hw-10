import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.classList.add('is-hidden');
catInfo.classList.add('is-hidden');
loader.classList.add('is-hidden');
error.classList.add('is-hidden');

error.style.display = 'none';
loader.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    Loading.remove();
    Notify.failure('Oops! Something went wrong! Try reloading page!'),
      {
        timeout: 4000,
        fontSize: '20px',
      };
    console.log(error);
  });

breedSelect.addEventListener('change', e => {
  Loading.circle('Loading data, please wait...');
  const breedSelect = e.target;
  const loadingMessage = document.querySelector('.loader');
  loadingMessage.style.display = 'block';
  const breedId = breedSelect.value;
  fetchCatByBreed(breedId, breedSelect)
    .then(cat => {
      if (cat) {
        loader.style.display = 'none';
        const breedInfo = cat[0].breeds[0];

        const catInfoDiv = document.querySelector('.cat-info');
        const catImage = document.createElement('img');
        catImage.src = cat[0].url;
        catImage.alt = `A ${
          breedSelect.options[breedSelect.selectedIndex].text
        } cat`;
        catImage.style.width = '400px';
        catImage.style.height = '400px';

        const catName = document.createElement('h2');
        catName.textContent =
          breedSelect.options[breedSelect.selectedIndex].text;

        const catDescription = document.createElement('p');
        catDescription.textContent = breedInfo.description;

        const catTemperament = document.createElement('p');
        catTemperament.textContent = `Temperament: ${breedInfo.temperament}`;

        catInfoDiv.innerHTML = '';
        catInfoDiv.appendChild(catImage);
        catInfoDiv.appendChild(catName);
        catInfoDiv.appendChild(catDescription);
        catInfoDiv.appendChild(catTemperament);

        Loading.remove();
      }
    })
    .catch(error => {
      console.log(error);
      Loading.remove();
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        timeout: 4000,
        fontSize: '20px',
      });
    });
});
