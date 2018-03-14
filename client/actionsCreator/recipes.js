import axios from 'axios';
import toastr from 'toastr';
import fetch from 'isomorphic-fetch';
import alert from 'sweetalert2';
import * as actions from '../actions/recipesAction';
import * as types from '../actions/types';

const URL = 'api/v1';

/**
 * @description - Calls the API to get all recipes
 *
 * @param {number} page
 *
 * @return {Object} dispatch an object
*/
export function getAllRecipesAction(page) {
  return (dispatch) => {
    dispatch(actions.getAllRecipesRequest());
    return axios.get(`${URL}/recipes?page=${page}`)
      .then((res) => {
        dispatch(actions.getAllRecipesSuccess(res.data, res.data.pages));
      })
      .catch((err) => {
        const { error } = err.response.data;
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
    return axios.get(`${URL}/recipes/?sort=upvotes&order=desc`)
      .then((res) => {
        dispatch(actions.getPopularRecipesSuccess(res.data));
      })
      .catch((err) => {
        const { error } = err.response.data;
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
    return axios.get(`/${URL}/recipes/${recipeId}`)
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
    return axios.post(`/${URL}/recipes/${recipeId}/reviews`, review)
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
  return dispatch => axios.post(`/${URL}/recipes/${recipeId}/votes?action=${voteAction}`)
    .then((res) => {
      dispatch(actions.voteARecipeSuccess(res.data));
    })
    .catch((err) => {
      const { response } = err;
      dispatch(actions.voteARecipeFailure(response.data));
    });
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
  return dispatch => axios.post(`/${URL}/users/${userId}/recipes`, recipeId)
    .then((res) => {
      dispatch(actions.favoriteRecipeSuccess(res.data.message, recipeId.recipeId));
      toastr.success(res.data.message);
    })
    .catch((err) => {
      dispatch(actions.favoriteRecipeFailure(err.response.data.error));
    });
}


/**
 * @description - Calls the API to fetch user Recipes
 *
 * @param {number} userId - id of user
 *
 * @param {number} page
 *
 * @return {Object} dispatch an object
*/
export function getUserRecipes(userId, page) {
  return (dispatch) => {
    dispatch(actions.getUserRecipeRequest());
    return axios.get(`/${URL}/users/${userId}/myrecipes?page=${page}`)
      .then((res) => {
        dispatch(actions.getUserRecipeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actions.getUserRecipeFailure(err.response.data));
      });
  };
}

/**
 * @description - Calls the API to fetch user favorite Recipes
 *
 * @param {number} userId - id of user
 *
 * @param {number} page
 *
 * @return {Object} dispatch an object
*/
export function getUserFavRecipes(userId) {
  return (dispatch) => {
    dispatch(actions.getUserFavRecipeRequest());
    return axios.get(`/${URL}/users/${userId}/recipes`)
      .then((res) => {
        dispatch(actions.getUserFavRecipeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actions.getUserFavRecipeFailure(err.response.data));
      });
  };
}

/**
 * @description - Calls the API to favorite a recipe
 *
 * @param {number} userId - id of user
 * @param  {number} recipeId - id of recipe to be favorited
 * @param {number} index - position of recipe in array
 *
 * @return {Object} dispatch an object
*/
export function favoriteARecipe(userId, recipeId, index) {
  return dispatch => axios.post(`/${URL}/users/${userId}/recipes`, recipeId)
    .then((res) => {
      dispatch(actions.favoriteARecipeSuccess(res.data.message, index));
      alert(
        'Deleted!',
        'Your recipe has been deleted.',
        'success'
      );
    })
    .catch((err) => {
      dispatch(actions.favoriteARecipeFailure(err.response.data.error));
    });
}

/**
 * @description - Calls the API to get ids of user favorite recipes
 *
 * @param {number} userId - id of user
 *
 * @return {Object} dispatch an object
*/
export function getFavoriteIds(userId) {
  return dispatch => axios.get(`/${URL}/users/${userId}/recipes/ids`)
    .then((res) => {
      dispatch(actions.getFavoriteRecipeIds(res.data.recipeIds));
    })
    .catch((err) => {
      dispatch(actions.getFavoriteRecipeIdsFailure(err.response.data.error));
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
      toastr.success(res.data.message);
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
  return dispatch => axios.post(`/${URL}/recipes`, recipeDetails)
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

/**
 * @description - Calls the API to delete a recipe
 *
 * @param {number} userId - id of recipe to be deleted
 *
 * @return {Object} dispatch an object
*/
export function getUserProfile(userId) {
  return (dispatch) => {
    dispatch(actions.getUSerInfo());
    return axios.get(`/${URL}/users/${userId}/profile`)
      .then((res) => {
        dispatch(actions.getUSerInfoSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actions.getUSerInfoFailure(err.response.data));
      });
  };
}

/**
 * @description - Calls the API to search for recipes
 *
 * @param {string} recipe - name or ingredient to search for
 *
 * @return {Object} dispatch an object
*/
export function searchRecipes(recipe) {
  return fetch(`/api/v1/search?recipe=${recipe}`)
    .then(response => response.json())
    .then(json => ({ options: json.recipes }))
    .catch(err => err);
}


/**
 * @description - Calls the API to delete a recipe
 *
 * @param {number} userId - id of recipe to be deleted
 *
 * @param {object} info - information to be updated
 *
 * @return {Object} dispatch an object
*/
export function updateUserProfile(userId, info) {
  return (dispatch) => {
    axios.put(`/${URL}/users/${userId}/update`, info)
      .then((res) => {
        dispatch(actions.updateProfileSuccess(res.data));
        toastr.success('Profile successfully updated');
      })
      .catch((err) => {
        dispatch(actions.updateProfileError(err.data));
      });
  };
}
