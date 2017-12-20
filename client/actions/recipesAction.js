import axios from 'axios';
import { GET_ALL_RECIPES } from './types';

const URL = '/api/v1';

/**
  * @description - Calls the API to get all recipes
  * @return {Object} dispatch an object
  */
export default function getAllRecipesAction() {
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
