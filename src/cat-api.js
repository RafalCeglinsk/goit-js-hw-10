import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_KUwNrJPHruhTV8kRFYa0uk4YRJ9J5F3caEHbIHJHSv4Dxredbn8xtNSfKlysFm4k';

const getUrl = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios
    .get(getUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      errorInAxios(error);
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      errorInAxios(error);
    });
}

function errorInAxios(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}
