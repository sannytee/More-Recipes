import axios from 'axios';
import { GET_ALL_RECIPES, GET_POPULAR_RECIPES } from './types';

const URL = '/api/v1';

/**
  * @description - Calls the API to get all recipes
  * @return {Object} dispatch an object
  */
export function getAllRecipesAction() {
  return dispatch => axios.get(`${URL}/recipes`)
    .then((res) => {
      dispatch({
        type: GET_ALL_RECIPES,
        recipes: res.data,
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
  * @description - Calls the API to get popular recipes
  * @return {Object} dispatch an object
  */
export function getPopularRecipesAction() {
  return dispatch => axios.get(`${URL}/recipes?sort=upvotes&order=desc`)
    .then((res) => {
      dispatch({
        type: GET_POPULAR_RECIPES,
        popularRecipes: res.data,
      });
    })
    .catch((err) => {
      console.dir(err);
    });
}
