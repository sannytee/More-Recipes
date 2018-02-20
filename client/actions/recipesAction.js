import * as types from './types';


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
  pagination: response.pages,
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
 * @description - action dispatch when request is first made
 *
 * @return {Object} dispatch an object
*/
export const getRecipeDataRequest = () => ({
  type: types.GET_RECIPE_DATA,
  isLoading: true,
});

/**
 * @description - action dispatch when request is successful
 *
 * @param  {Object} response
 *
 * @return {Object} dispatch an object
*/
export const getRecipeDataSuccess = response => ({
  type: types.GET_RECIPE_DATA_SUCCESS,
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
export const getRecipeDataFailure = error => ({
  type: types.GET_RECIPE_DATA_FAILURE,
  payload: error,
  isLoading: false
});

/**
 * @description - action dispatch when request is first made
 *
 * @return {Object} dispatch an object
*/
export const createReviewRequest = () => ({
  type: types.CREATE_REVIEW,
  isLoading: true,
});


/**
 * @description - action dispatch when request is successful
 *
 * @param  {Object} response
 *
 * @return {Object} dispatch an object
*/
export const createReviewSuccess = response => ({
  type: types.CREATE_REVIEW_SUCCESS,
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
export const createReviewFailure = error => ({
  type: types.CREATE_REVIEW_FAILURE,
  payload: error,
  isLoading: false
});

/**
  * @description - action to reset the error
  *
  * @param  {string} error
  *
  * @return {Object} dispatch an object
  */
export const resetReviewError = error => ({
  type: types.RESET_REVIEW_ERROR,
  payload: error,
});


/**
 * @description - action dispatch when request is successful
 *
 * @param  {Object} response
 *
 * @return {Object} dispatch an object
*/
export const voteARecipeSuccess = response => ({
  type: types.VOTE_A_RECIPE_SUCCESS,
  payload: response
});

/**
  * @description - action to reset the error
  *
  * @param  {string} error
  *
  * @return {Object} dispatch an object
  */
export const voteARecipeFailure = error => ({
  type: types.VOTE_A_RECIPE_FAILURE,
  payload: error,
});

/**
 * @description - action dispatch when request failed
 *
 * @param  {Object} error
 *
 * @return {Object} dispatch an object
*/
export const favoriteRecipeFailure = error => ({
  type: types.FAVORITE_RECIPE_FAILURE,
  payload: error,
});

/**
 * @description - action dispatch when request is successful
 *
 * @param  {Object} response
 *
 * @return {Object} dispatch an object
*/
export const favoriteRecipeSuccess = response => ({
  type: types.FAVORITE_RECIPE_SUCCESS,
  payload: response
});

