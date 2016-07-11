const axios = require('axios');
const recAlgo = require('./recommondations/recommenderAlgo.js');
const mostPopular = require('./recommondations/mostPopular.js');

const URL = 'http://localhost:3000/';
axios.get(URL + 'api/fetchData').then((response) => {
  recAlgo(response.data.UserFavs);
  mostPopular(response.data.recipeCount);
})