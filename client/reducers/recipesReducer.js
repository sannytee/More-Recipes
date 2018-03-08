/* eslint-disable no-case-declarations */
import alert from 'sweetalert2';
import * as types from '../actions/types';


const initialState = {
  recipes: [],
  favoriteRecipeCount: null,
  userRecipesCount: null,
  popularRecipes: [],
  favoriteRecipes: {
    favorited: []
  },
  favoriteRecipesIds: [],
  userRecipes: [],
  currentRecipe: {},
  error: null,
  userRecipeError: null,
  reviewError: null,
  voteError: null,
  isLoading: false,
  favMessage: null,
  favError: null,
  pages: 0
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
    case types.GET_ALL_RECIPES:
      return { ...state, isLoading: action.isLoading };
    case types.GET_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload.allRecipes,
        isLoading: action.isLoading,
        pages: action.payload.pages
      };
    case types.GET_ALL_RECIPES_FAILURE:
      return { ...state, error: action.error, isLoading: action.isLoading };
    case types.GET_POPULAR_RECIPES:
      return { ...state, isLoading: action.isLoading };
    case types.GET_POPULAR_RECIPES_SUCCESS:
      return { ...state, popularRecipes: action.payload, isLoading: action.isLoading };
    case types.GET_POPULAR_RECIPES_FAILURE:
      return { ...state, error: action.error, isLoading: action.isLoading };
    case types.VOTE_RECIPE:
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
    case types.CREATE_RECIPE:
      if (state.recipes.length === 6 || state.userRecipes.length === 6) {
        return state;
      }
      return {
        ...state,
        recipes: [...state.recipes, action.payload.Recipe],
        userRecipes: [...state.userRecipes, action.payload.Recipe]
      };
    case types.GET_USER_RECIPES:
      return { ...state, isLoading: action.isLoading };
    case types.GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userRecipes: action.payload.userRecipes,
        pages: action.payload.pages,
        userRecipesCount: action.payload.totalRecipes
      };
    case types.GET_USER_RECIPES_FAILURE:
      return { ...state, isLoading: action.isLoading, userRecipeError: action.payload };
    case types.EDIT_RECIPE:
      const { index } = action;
      const myRecipes = state.userRecipes;
      const updatedUserRecipes = [
        ...myRecipes.slice(0, index),
        action.payload.Recipe,
        ...myRecipes.slice(index + 1)
      ];
      return { ...state, userRecipes: updatedUserRecipes };
    case types.DELETE_RECIPE:
      const { position } = action;
      const currentRecipes = state.userRecipes;
      const updatedRecipesArray = [
        ...currentRecipes.slice(0, position),
        ...currentRecipes.slice(position + 1)
      ];
      return { ...state, userRecipes: updatedRecipesArray };
    case types.GET_RECIPE_DATA:
      return { ...state, isLoading: action.isLoading };
    case types.GET_RECIPE_DATA_SUCCESS:
      return { ...state, currentRecipe: action.payload, isLoading: action.isLoading };
    case types.GET_RECIPE_DATA_FAILURE:
      return { ...state, error: action.payload, isLoading: action.isLoading };
    case types.CREATE_REVIEW_SUCCESS:
      const recipe = state.currentRecipe;
      const { reviews } = recipe;
      const updatedReviews = [
        ...reviews.slice(0, reviews.length),
        action.payload
      ];
      const updatedRecipe = {
        ...recipe, reviews: updatedReviews
      };
      return { ...state, currentRecipe: updatedRecipe };
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, reviewError: action.payload };
    case types.RESET_REVIEW_ERROR:
      return { ...state, reviewError: action.payload };
    case types.VOTE_A_RECIPE_SUCCESS:
      const newRecipe = {
        ...state.currentRecipe,
        upvotes: action.payload.recipe.upvotes,
        downvotes: action.payload.recipe.downvotes
      };
      return { ...state, currentRecipe: newRecipe };
    case types.VOTE_A_RECIPE_FAILURE:
      return { ...state, voteError: action.payload };
    case types.FAVORITE_RECIPE_SUCCESS:
      if (action.payload === 'Recipe removed from favorites') {
        const indexPosition = state.favoriteRecipesIds.indexOf(action.recipeId);
        const updatedRecipesIdsArray = [
          ...state.favoriteRecipesIds.slice(0, indexPosition),
          ...state.favoriteRecipesIds.slice(indexPosition + 1)
        ];
        return { ...state, favMessage: action.payload, favoriteRecipesIds: updatedRecipesIdsArray };
      }
      return {
        ...state,
        favMessage: action.payload,
        favoriteRecipesIds: [
          ...state.favoriteRecipesIds,
          action.recipeId
        ]
      };
    case types.FAVORITE_RECIPE_FAILURE:
      return { ...state, favError: action.payload };
    case types.GET_USER_FAVORITE_RECIPE:
      return { ...state, isLoading: action.isLoading };
    case types.GET_USER_FAVORITE_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        favoriteRecipes: action.payload,
        favoriteRecipeCount: action.count
      };
    case types.GET_USER_FAVORITE_RECIPE_FAILURE:
      return { ...state, isLoading: action.isLoading, favError: action.payload };
    case types.FAVORITE_A_RECIPE_SUCCESS:
      const arrayIndex = action.index;
      const updatedFavoriteRecipes = {
        favorited: [
          ...state.favoriteRecipes.favorited.slice(0, arrayIndex),
          ...state.favoriteRecipes.favorited.slice(arrayIndex + 1)
        ]
      };
      alert(
        'Deleted!',
        'Your recipe has been deleted.',
        'success'
      );
      return { ...state, favoriteRecipes: updatedFavoriteRecipes };
    case types.FAVORITE_A_RECIPE_FAILURE:
      return { ...state, favError: action.payload };
    case types.GET_USER_FAVORITE_RECIPE_IDS:
      return { ...state, favoriteRecipesIds: action.payload };
    case types.GET_USER_FAVORITE_RECIPE_IDS_FAILURE:
      return { ...state, favError: action.payload };
    default:
      return state;
  }
}

export default recipeReducer;
