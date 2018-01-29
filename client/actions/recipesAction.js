import axios from 'axios';
import { GET_ALL_RECIPES,
  GET_POPULAR_RECIPES,
  VOTE_RECIPE,
  CREATE_RECIPE,
  GET_USER_RECIPES,
  EDIT_RECIPE,
  GET_RECIPE_DATA,
  DELETE_RECIPE
} from './types';

const URL = '/api/v1';

/**
 * @description - Calls the API to get all recipes
 *
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
 *
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
 *
 * @param  {int} recipeId - id of recipe to be upvoted or downvoted
 * @param {string} voteAction - specify the action - upvote or downvote
 * @param  {int} index - index of recipe in array
 *
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

/**
 * @description - Calls the API to create recipe
 *
 * @param {object} recipeDetails - details of recipe to be added
 *
 * @return {Object} dispatch an object
*/
export function createRecipeAction(recipeDetails) {
  return dispatch => axios.post(`${URL}/recipes`, recipeDetails)
    .then((res) => {
      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
 * @description - Calls the API to fetch user Recipes
 *
 * @param {number} userId - id of user
 *
 * @return {Object} dispatch an object
*/
export function getUserRecipes(userId) {
  return dispatch => axios.get(`${URL}/users/${userId}/myrecipes`)
    .then((res) => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: res.data
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
 * @description - Calls the API to edit recipe
 *
 * @param {number} recipeId - id of recipe to be updated
 * @param {object} recipeDetails - details of new recipe
 * @param {number} index - index of recipe in array
 *
 * @return {Object} dispatch an object
*/
export function editRecipeAction(recipeId, recipeDetails, index) {
  return dispatch => axios.put(`${URL}/recipes/${recipeId}`, recipeDetails)
    .then((res) => {
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data,
        index
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
 * @description - Calls the API to get details about a recipe
 *
 * @param {number} recipeId - id of recipe to be fetch
 *
 * @return {Object} dispatch an object
*/
export function getRecipeData(recipeId) {
  return dispatch => axios.get(`${URL}/recipes/${recipeId}`)
    .then((res) => {
      dispatch({
        type: GET_RECIPE_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      throw (err);
    });
}

/**
 * @description - Calls the API to delete a recipe
 *
 * @param {number} recipeId - id of recipe to be deleted
 * @param {number} position - index of recipe in array
 *
 * @return {Object} dispatch an object
*/
export function deleteRecipeAction(recipeId, position) {
  return dispatch => axios.delete(`${URL}/recipes/${recipeId}`)
    .then(() => {
      dispatch({
        type: DELETE_RECIPE,
        position
      });
    })
    .catch((err) => {
      throw (err);
    });
}
