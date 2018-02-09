import axios from 'axios';
import * as types from './types';

const URL = '/api/v1';

/**
 * @description - action dispatch when request is first made
 *
 * @return {Object} dispatch an object
*/
export const getAllRecipesRequest = () => ({
  type: types.GET_ALL_RECIPES,
  isLoading: true
});

/**
 * @description - action dispatch when request is successful
 *
 * @param  {Array} response
 *
 * @return {Object} dispatch an object
*/
export const getAllRecipesSuccess = response => ({
  type: types.GET_ALL_RECIPES_SUCCESS,
  payload: response,
  isLoading: false
});

/**
 * @description - action dispatch when request failed
 *
 * @param  {string} error
 *
 * @return {Object} dispatch an object
*/
export const getAllRecipesFailue = error => ({
  type: types.GET_ALL_RECIPES_FAILURE,
  payload: error,
  isLoading: false
});


/**
 * @description - action dispatch when request is first made
 *
 * @return {Object} dispatch an object
*/
export const getPopularRecipesRequest = () => ({
  type: types.GET_POPULAR_RECIPES,
  isLoading: true
});


/**
 * @description - action dispatch when request is successful
 *
 * @param  {Array} response
 *
 * @return {Object} dispatch an object
*/
export const getPopularRecipesSuccess = response => ({
  type: types.GET_POPULAR_RECIPES_SUCCESS,
  payload: response,
  isLoading: false
});

/**
 * @description - action dispatch when request failed
 *
 * @param  {string} error
 *
 * @return {Object} dispatch an object
*/
export const getPopularRecipesFailure = error => ({
  type: types.GET_POPULAR_RECIPES_FAILURE,
  payload: error,
  isLoading: false
});


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
        type: types.VOTE_RECIPE,
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
        type: types.CREATE_RECIPE,
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
        type: types.GET_USER_RECIPES,
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
        type: types.EDIT_RECIPE,
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
        type: types.GET_RECIPE_DATA,
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
        type: types.DELETE_RECIPE,
        position
      });
    })
    .catch((err) => {
      throw (err);
    });
}
