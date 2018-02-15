import axios from 'axios';
import * as actions from '../actions/recipesAction';
import * as types from '../actions/types';

const URL = 'api/v1';

/**
 * @description - Calls the API to get all recipes
 *
 * @return {Object} dispatch an object
*/
export function getAllRecipesAction() {
  return (dispatch) => {
    dispatch(actions.getAllRecipesRequest());
    axios.get(`${URL}/recipes`)
      .then((res) => {
        dispatch(actions.getAllRecipesSuccess(res.data));
      })
      .catch((err) => {
        const { error } = err.response;
        dispatch(actions.getAllRecipesFailue(error));
      });
  };
}

/**
 * @description - Calls the API to get popular recipes
 *
 * @return {Object} dispatch an object
*/
export function getPopularRecipesAction() {
  return (dispatch) => {
    dispatch(actions.getPopularRecipesRequest());
    axios.get(`${URL}/recipes?sort=upvotes&order=desc`)
      .then((res) => {
        dispatch(actions.getPopularRecipesSuccess(res.data));
      })
      .catch((err) => {
        const { error } = err.response;
        dispatch(actions.getPopularRecipesFailure(error));
      });
  };
}

/**
 * @description - Calls the API to get details about a recipe
 *
 * @param {number} recipeId - id of recipe to be fetch
 *
 * @return {Object} dispatch an object
*/
export function getRecipeData(recipeId) {
  return (dispatch) => {
    dispatch(actions.getRecipeDataRequest());
    axios.get(`/${URL}/recipes/${recipeId}`)
      .then((res) => {
        dispatch(actions.getRecipeDataSuccess(res.data));
      })
      .catch((err) => {
        const { response } = err;
        dispatch(actions.getRecipeDataFailure(response.data.message));
      });
  };
}

/**
 * @description - Calls the API to post  review for a recipe
 *
 * @param {number} recipeId - id of recipe to be reviewed
 *
 * @param {string} review - comment about recipe
 *
 * @return {Object} dispatch an object
*/
export function postReview(recipeId, review) {
  return (dispatch) => {
    dispatch(actions.createReviewRequest());
    axios.post(`/${URL}/recipes/${recipeId}/reviews`, review)
      .then((res) => {
        document.getElementById('review-form').reset();
        dispatch(actions.createReviewSuccess(res.data.review));
      })
      .catch((err) => {
        const { response } = err;
        dispatch(actions.createReviewFailure(response.data.message));
      });
  };
}

/**
 * @description - Calls the API to vote a recipe
 *
 * @param {number} recipeId - id of recipe to be  voted
 *
 * @param {string} voteAction - specify either upvotes or downvotes
 *
 * @return {Object} dispatch an object
*/
export function voteARecipe(recipeId, voteAction) {
  return (dispatch) => {
    axios.post(`/${URL}/recipes/${recipeId}/votes?action=${voteAction}`)
      .then((res) => {
        dispatch(actions.voteARecipeSuccess(res.data));
      })
      .catch((err) => {
        const { response } = err;
        dispatch(actions.voteARecipeFailure(response));
      });
  };
}

/**
  * @description - calls the action to dispatch resetState action
  *
  * @param  {string} error
  *
  * @return {Object} dispatch an object
  */
export function resetReviewError(error) {
  return (dispatch) => {
    dispatch(actions.resetReviewError(error));
  };
}

/**
 * @description - Calls the API to favorite a recipe
 *
 * @param {number} userId - id of user
 *
 * @param  {number} recipeId - id of recipe to be favorited
 *
 * @return {Object} dispatch an object
*/
export function favoriteRecipe(userId, recipeId) {
  return (dispatch) => {
    axios.post(`/${URL}/users/${userId}/recipes`, recipeId)
      .then((res) => {
        dispatch(actions.favoriteRecipeSuccess(res.data.message));
      })
      .catch((err) => {
        dispatch(actions.favoriteRecipeFailure(err.response.data.error));
      });
  };
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
