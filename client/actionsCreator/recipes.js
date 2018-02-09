import axios from 'axios';
import * as actions from '../actions/recipesAction';

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
