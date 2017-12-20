import { GET_ALL_RECIPES } from '../actions/types';

const initialState = {
  recipes: [],
  favoriteRecipes: [],
};


/**
  * @description -modifies the state based on action type
  * @param  {Object} state
  * @param  {Object} action
  * @return {Object} returns a new state
  */
function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: action.recipes };
    default:
      return state;
  }
}

export default authReducer;
