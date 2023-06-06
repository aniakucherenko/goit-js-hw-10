const API_KEY =
  'live_ftJpmYN2xwgg9lxYsoXLeb9iNpEf8SCYFSPsILE56VPfvLeUykH1O1Vk3f9bMUn3';

export const fetchBreeds = fetch('https://api.thecatapi.com/v1/breeds').then(
  response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }
);

export const fetchCatByBreed = catsId => {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${catsId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
