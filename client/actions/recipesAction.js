import axios from 'axios';
import { GET_ALL_RECIPES,
  GET_POPULAR_RECIPES,
  VOTE_RECIPE
} from './types';

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
        payload: res.data,
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
        payload: res.data,
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
  * @description - Calls the API to upvote or downvote recipe
  * @param  {int} recipeId - id of recipe to be upvoted or downvoted
  * @param {string} voteAction - specify the action - upvote or downvote
    * @param  {int} index - index of recipe in array
  * @return {Object} dispatch an object
  */
export function voteRecipeAction(recipeId, voteAction, index) {
  return dispatch => axios.post(`${URL}/recipes/${recipeId}/votes?action=${voteAction}`)
    .then((res) => {
      dispatch({
        type: VOTE_RECIPE,
        payload: res.data,
        index,
      });
    })
    .catch((err) => {
      throw (err);
    });
}
