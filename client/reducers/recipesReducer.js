import { GET_ALL_RECIPES, GET_POPULAR_RECIPES } from '../actions/types';

const initialState = {
  recipes: [],
  popularRecipes: [],
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
    case GET_POPULAR_RECIPES:
      return { ...state, popularRecipes: action.popularRecipes };
    default:
      return state;
  }
}

export default authReducer;
