/* eslint-disable no-case-declarations */
import { GET_ALL_RECIPES,
  GET_POPULAR_RECIPES,
  VOTE_RECIPE,
  CREATE_RECIPE,
  GET_USER_RECIPES,
  EDIT_RECIPE,
  DELETE_RECIPE
} from '../actions/types';


const initialState = {
  recipes: [],
  popularRecipes: [],
  favoriteRecipes: [],
  userRecipes: []
};


/**
 * @description -modifies the state based on action type
 *
 * @param  {Object} state
 * @param  {Object} action
 *
 * @return {Object} returns a new state
*/
function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_POPULAR_RECIPES:
      return { ...state, popularRecipes: action.payload };
    case VOTE_RECIPE:
      const i = action.index;
      const allRecipes = state.recipes;
      const updatedRecipes = [
        ...allRecipes.slice(0, i), // before the one we are updating
        {
          ...allRecipes[i],
          upvotes: action.payload.recipe.upvotes,
          downvotes: action.payload.recipe.downvotes
        },
        ...allRecipes.slice(i + 1), // after the one we are updating
      ];
      return { ...state, recipes: updatedRecipes };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload.Recipe],
        userRecipes: [...state.userRecipes, action.payload.Recipe]
      };
    case GET_USER_RECIPES:
      return { ...state, userRecipes: action.payload };
    case EDIT_RECIPE:
      const { index } = action;
      const myRecipes = state.userRecipes;
      const updatedUserRecipes = [
        ...myRecipes.slice(0, index),
        action.payload.Recipe,
        ...myRecipes.slice(index + 1)
      ];
      return { ...state, userRecipes: updatedUserRecipes };
    case DELETE_RECIPE:
      const { position } = action;
      const currentRecipes = state.userRecipes;
      const updatedRecipesArray = [
        ...currentRecipes.slice(0, position),
        ...currentRecipes.slice(position + 1)
      ];
      return { ...state, userRecipes: updatedRecipesArray };
    default:
      return state;
  }
}

export default recipeReducer;
