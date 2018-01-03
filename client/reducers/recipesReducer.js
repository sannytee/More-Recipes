import { GET_ALL_RECIPES,
  GET_POPULAR_RECIPES,
  VOTE_RECIPE
} from '../actions/types';


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
function recipeReducer(state = initialState, action) {
  let updatedRecipes;
  const i = action.index;
  let allRecipes;
  switch (action.type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_POPULAR_RECIPES:
      return { ...state, popularRecipes: action.payload };
    case VOTE_RECIPE:
      allRecipes = state.recipes;
      updatedRecipes = [
        ...allRecipes.slice(0, i), // before the one we are updating
        {
          ...allRecipes[i],
          upvotes: action.payload.recipe.upvotes,
          downvotes: action.payload.recipe.downvotes
        },
        ...allRecipes.slice(i + 1), // after the one we are updating
      ];
      return { ...state, recipes: updatedRecipes };
    default:
      return state;
  }
}

export default recipeReducer;
