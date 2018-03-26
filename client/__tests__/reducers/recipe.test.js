import expect from 'expect';
import RecipeReducer from '../../reducers/recipesReducer';
import * as types from '../../actions/types';

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
  isLoading: null,
  favMessage: null,
  favError: null,
  pages: 0
};

const allRecipes = [
  {
    id: 1,
    recipeName: 'Meat',
    image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2Fa42ee49b-c834-46a2-aa81-bd9908d05e1a.jpg?alt=media&token=250caa19-37b4-4f15-b75f-88d6fb0f2311',
    mealType: 'breakfast',
    description: 'Buy the meat from market',
    method: 'fry the yam for five minutes',
    ingredients: 'water, beans,hfj',
    upvotes: 1,
    downvotes: 0,
    userId: 2,
    addedBy: 'example20',
    createdAt: '2018-03-10T21:12:36.834Z',
    updatedAt: '2018-03-10T21:13:24.409Z'
  },
  {
    id: 3,
    recipeName: 'Beef soup',
    image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F73c9e83e-766d-487b-9c04-8a14296d9cad.jpg?alt=media&token=09129c8b-a31f-4cd5-b9b5-9d23216224d2',
    mealType: 'breakfast',
    description: 'Buy the meat from market',
    method: 'fry the yam for five minutes',
    ingredients: 'water, beans,hfj',
    upvotes: 0,
    downvotes: 1,
    userId: 2,
    addedBy: 'example20',
    createdAt: '2018-03-10T21:12:37.488Z',
    updatedAt: '2018-03-10T21:13:05.249Z'
  }
];

const currentRecipe = {
  id: 1,
  recipeName: 'Meat',
  image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2Fa42ee49b-c834-46a2-aa81-bd9908d05e1a.jpg?alt=media&token=250caa19-37b4-4f15-b75f-88d6fb0f2311',
  mealType: 'breakfast',
  description: 'Buy the meat from market',
  method: 'fry the yam for five minutes',
  ingredients: 'water, beans,hfj',
  upvotes: 1,
  downvotes: 0,
  userId: 2,
  reviews: [],
  addedBy: 'example20',
  createdAt: '2018-03-10T21:12:36.834Z',
  updatedAt: '2018-03-10T21:13:24.409Z'
};

const message = {
  description1: 'should set error and isLoading',
  description2: 'should set isLoading',
  description3: 'popular recipes  when GET_POPULAR_RECIPES_SUCCESS is passed',
  description4: 'when CREATE_RECIPE is called with length of recipe array  exceeding 6',
  description5: 'when GET_ALL_RECIPES_SUCCESS is passed',
  description6: 'userRecipeCount when GET_USER_RECIPES_SUCCESS is passed',
  description7: 'when GET_RECIPE_DATA_SUCCESS is passed',
  description8: 'when FAVORITE_RECIPE_SUCCESS is passed',
  description9: 'when recipe is removed from favorites',
  description10: 'when GET_USER_FAVORITE_RECIPE_FAILURE is passed',
  newDescription: 'favoriteRecipeCount when GET_USER_FAVORITE_RECIPE_SUCCESS is passed'
};

describe('Recipe Reducer', () => {
  it('should return update default state when no state is passed', () => {
    const action = {
      type: '',
    };
    const newState = RecipeReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
  it(`${message.description2} when GET_ALL_RECIPES is passed`, () => {
    const action = {
      type: types.GET_ALL_RECIPES,
      isLoading: true
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
  });

  it(`${message.description2}, recipes and pages ${message.description5}`, () => {
    const action = {
      type: types.GET_ALL_RECIPES_SUCCESS,
      payload: {
        allRecipes,
        pages: 0
      },
      isLoading: false

    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.pages).toEqual(action.payload.pages);
    expect(newState.recipes).toEqual(action.payload.allRecipes);
  });

  it(`${message.description1} when GET_ALL_RECIPES_FAILURE is passed`, () => {
    const action = {
      type: types.GET_ALL_RECIPES_FAILURE,
      payload: 'Server error occured',
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.error).toEqual(action.payload);
  });

  it(`${message.description2} when GET_POPULAR_RECIPES is passed`, () => {
    const action = {
      type: types.GET_POPULAR_RECIPES,
      isLoading: true
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
  });

  it(`${message.description2} and  ${message.description3}`, () => {
    const action = {
      type: types.GET_POPULAR_RECIPES_SUCCESS,
      payload: allRecipes,
      isLoading: false

    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.popularRecipes).toEqual(action.payload);
  });

  it(`${message.description1} when GET_POPULAR_RECIPES_FAILURE is passed`, () => {
    const action = {
      type: types.GET_POPULAR_RECIPES_FAILURE,
      payload: 'Server error occured',
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.error).toEqual(action.payload);
  });

  it('should set recipes when VOTE_RECIPE is called', () => {
    const action = {
      type: types.VOTE_RECIPE,
      payload: {
        message: 'Recipe successfully downvoted',
        recipe: {
          id: 3,
          recipeName: 'Beef soup',
          image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F73c9e83e-766d-487b-9c04-8a14296d9cad.jpg?alt=media&token=09129c8b-a31f-4cd5-b9b5-9d23216224d2',
          mealType: 'breakfast',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes',
          ingredients: 'water, beans,hfj',
          upvotes: 1,
          downvotes: 0,
          userId: 2,
          addedBy: 'example20',
          createdAt: '2018-03-10T21:12:37.488Z',
          updatedAt: '2018-03-10T21:13:05.249Z'
        }
      },
      identifier: 3
    };
    const recipeState = initialState;
    recipeState.recipes = allRecipes;
    const newState = RecipeReducer(recipeState, action);
    expect(newState.recipes[1]).toEqual(action.payload.recipe);
  });

  it('should set recipes and userRecipes when CREATE_RECIPE is called', () => {
    const action = {
      type: types.CREATE_RECIPE,
      payload: {
        success: true,
        Recipe: {
          upvotes: 0,
          downvotes: 0,
          id: 59,
          userId: 1,
          addedBy: 'sannytee',
          recipeName: 'indomie',
          mealType: 'breakfast',
          description: 'amazing',
          method: 'google it',
          ingredients: 'indomie',
          image: 'https://firebasestorage.googleapis.com',
          updatedAt: '2018-03-10T23:12:44.072Z',
          createdAt: '2018-03-10T23:12:44.072Z'
        },
        message: 'Recipe successfully added'
      }
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.recipes).toContainEqual(action.payload.Recipe);
    expect(newState.userRecipes).toContainEqual(action.payload.Recipe);
  });

  it(`should not set recipes and userRecipes ${message.description4}`, () => {
    const action = {
      type: types.CREATE_RECIPE,
      payload: {
        success: true,
        Recipe: {
          recipeName: 'indomie',
        },
        message: 'Recipe successfully added'
      }
    };
    const testState = initialState;
    testState.recipes = [{}, {}, {}, {}, {}, {}];
    const newState = RecipeReducer(testState, action);
    expect(newState).toEqual(initialState);
  });

  it(`${message.description2} when GET_USER_RECIPES is passed`, () => {
    const action = {
      type: types.GET_USER_RECIPES,
      isLoading: true
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
  });

  it(`${message.description2}, userRecipes, pages, and ${message.description6}`, () => {
    const action = {
      type: types.GET_USER_RECIPES_SUCCESS,
      payload: {
        userRecipes: allRecipes,
        pages: 1,
        totalRecipes: 2
      },
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.userRecipes).toEqual(action.payload.userRecipes);
    expect(newState.userRecipesCount).toEqual(action.payload.totalRecipes);
    expect(newState.pages).toEqual(action.payload.pages);
  });

  it(`${message.description1} when GET_USER_RECIPES_FAILURE is passed`, () => {
    const action = {
      type: types.GET_USER_RECIPES_FAILURE,
      payload: 'Server error occured',
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.userRecipeError).toEqual(action.payload);
  });

  it('should set userRecipes when EDIT_RECIPE is passed', () => {
    const action = {
      type: types.EDIT_RECIPE,
      payload: {
        Recipe: {
          id: 1,
          recipeName: 'Meat',
          image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2Fa42ee49b-c834-46a2-aa81-bd9908d05e1a.jpg?alt=media&token=250caa19-37b4-4f15-b75f-88d6fb0f2311',
          mealType: 'lunch',
          description: 'awesome stuff',
          method: 'fry the yam for five minutes',
          ingredients: 'water, beans,hfj',
          upvotes: 1,
          downvotes: 0,
          userId: 2,
          addedBy: 'example20',
          createdAt: '2018-03-10T21:12:36.834Z',
          updatedAt: '2018-03-10T21:13:24.409Z'
        },
        message: 'Recipe successfully updated'
      },
    };
    const testState = initialState;
    testState.userRecipes = allRecipes;
    const newState = RecipeReducer(testState, action);
    expect(newState.userRecipes[0]).toEqual(action.payload.Recipe);
  });

  it('should set userRecipes when DELETE_RECIPE is passed', () => {
    const action = {
      type: types.DELETE_RECIPE,
      recipeId: 1
    };
    const stateWithUserRecipes = initialState;
    stateWithUserRecipes.userRecipes = allRecipes;
    const expected = stateWithUserRecipes.userRecipes;
    const newState = RecipeReducer(stateWithUserRecipes, action);
    expect(newState.userRecipes).not.toEqual(expect.arrayContaining(expected));
  });

  it(`${message.description2} when GET_RECIPE_DATA is passed`, () => {
    const action = {
      type: types.GET_RECIPE_DATA,
      isLoading: true
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
  });

  it(`${message.description2} and currentRecipe ${message.description7}`, () => {
    const action = {
      type: types.GET_RECIPE_DATA_SUCCESS,
      payload: {
        id: 1,
        recipeName: 'Meat',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2Fa42ee49b-c834-46a2-aa81-bd9908d05e1a.jpg?alt=media&token=250caa19-37b4-4f15-b75f-88d6fb0f2311',
        mealType: 'breakfast',
        description: 'Buy the meat from market',
        method: 'fry the yam for five minutes',
        ingredients: 'water, beans,hfj',
        upvotes: 1,
        downvotes: 0,
        userId: 2,
        addedBy: 'example20',
        createdAt: '2018-03-10T21:12:36.834Z',
        updatedAt: '2018-03-10T21:13:24.409Z'
      },
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.currentRecipe).toEqual(action.payload);
  });

  it(`${message.description1} when GET_RECIPE_DATA_FAILURE is passed`, () => {
    const action = {
      type: types.GET_RECIPE_DATA_FAILURE,
      payload: 'Server error occured',
      isLoading: false
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.error).toEqual(action.payload);
  });

  it('should set reviwError when CREATE_REVIEW_FAILURE is passed', () => {
    const action = {
      type: types.CREATE_REVIEW_FAILURE,
      payload: 'Server error occured',
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.reviewError).toEqual(action.payload);
  });

  it('should set currentRecipe when CREATE_REVIEW_SUCCESS is passed', () => {
    const action = {
      type: 'CREATE_REVIEW_SUCCESS',
      payload: {
        id: 23,
        userId: 2,
        username: 'sannytee',
        recipeId: 1,
        review: 'hmmmm',
        updatedAt: '2018-03-11T06:56:17.752Z',
        createdAt: '2018-03-11T06:56:17.752Z'
      },
      isLoading: false
    };
    const stateWithCurrentRecipe = initialState;
    stateWithCurrentRecipe.currentRecipe = currentRecipe;
    const newState = RecipeReducer(stateWithCurrentRecipe, action);
    const expected = stateWithCurrentRecipe.currentRecipe;
    expect(newState.currentRecipes).not.toEqual(expect.objectContaining(expected));
  });

  it('should set reviewError when  RESET_REVIEW_ERROR is passed', () => {
    const action = {
      type: types.RESET_REVIEW_ERROR,
      payload: ''
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.reviewError).toEqual(action.payload);
  });

  it('should set currentRecipe when VOTE_A_RECIPE_SUCCESS is passed', () => {
    const action = {
      type: 'VOTE_A_RECIPE_SUCCESS',
      payload: {
        message: 'Recipe successfully upvoted',
        recipe: {
          id: 59,
          upvotes: 0,
          downvotes: 0,
        }
      }
    };
    const stateWithCurrentRecipe = initialState;
    stateWithCurrentRecipe.currentRecipe = currentRecipe;
    const newState = RecipeReducer(initialState, action);
    expect(newState.currentRecipe.upvotes).toEqual(action.payload.recipe.upvotes);
    expect(newState.currentRecipe.downvotes).toEqual(action.payload.recipe.downvotes);
  });

  it('should set voteError when  VOTE_A_RECIPE_FAILURE is passed', () => {
    const action = {
      type: types.VOTE_A_RECIPE_FAILURE,
      payload: 'Server error'
    };

    const newState = RecipeReducer(initialState, action);
    expect(newState.voteError).toEqual(action.payload);
  });

  it(`should set favMessage and favoriteRecipesIds ${message.description8}`, () => {
    const action = {
      type: types.FAVORITE_RECIPE_SUCCESS,
      payload: 'Recipe Favorited',
      recipeId: 59
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favMessage).toEqual(action.payload);
    expect(newState.favoriteRecipesIds).toContain(action.recipeId);
  });

  it(`should set favMessage and favoriteRecipesIds ${message.description9}`, () => {
    const action = {
      type: types.FAVORITE_RECIPE_SUCCESS,
      payload: 'Recipe removed from favorites',
      recipeId: 59
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favMessage).toEqual(action.payload);
    expect(newState.favoriteRecipesIds).not.toContain(action.recipeId);
  });

  it('should set favError when FAVORITE_RECIPE_FAILURE is passed', () => {
    const action = {
      type: types.FAVORITE_RECIPE_FAILURE,
      payload: 'server error occured'
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favError).toEqual(action.payload);
  });

  it(`${message.description2} when GET_USER_FAVORITE_RECIPE is passed`, () => {
    const action = {
      type: types.GET_USER_FAVORITE_RECIPE,
      isLoading: true
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
  });

  it(`${message.description2}, favoriteRecipes and ${message.newDescription}`, () => {
    const action = {
      type: types.GET_USER_FAVORITE_RECIPE_SUCCESS,
      payload: {
        message: 'You have no favorite recipes',
      },
      count: 0
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favoriteRecipeCount).toEqual(action.count);
    expect(newState.favoriteRecipes).toEqual(action.payload);
  });

  it(`${message.description2} and favError ${message.description10}`, () => {
    const action = {
      type: types.GET_USER_FAVORITE_RECIPE_FAILURE,
      isLoading: false,
      payload: 'An error occurred'
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.isLoading).toEqual(action.isLoading);
    expect(newState.favError).toEqual(action.payload);
  });

  it('should set favoriteRecipes when FAVORITE_A_RECIPE_SUCCESS is passed', () => {
    const action = {
      type: types.FAVORITE_A_RECIPE_SUCCESS,
      payload: 'Recipe removed from favorites',
      index: 0
    };
    const stateWithFavoriteRecipe = initialState;
    stateWithFavoriteRecipe.favoriteRecipes.favorited = allRecipes;
    const expected = stateWithFavoriteRecipe.favoriteRecipes.favorited;
    const newState = RecipeReducer(stateWithFavoriteRecipe, action);
    expect(newState.favoriteRecipes.favorited).not.toEqual(expect.arrayContaining(expected));
  });

  it('should set favError when FAVORITE_A_RECIPE_FAILURE is passed', () => {
    const action = {
      type: types.FAVORITE_A_RECIPE_FAILURE,
      payload: 'An error occurred'
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favError).toEqual(action.payload);
  });

  it('should set favoriteRecipeIds when GET_USER_FAVORITE_RECIPE_IDS is passed', () => {
    const action = {
      type: types.GET_USER_FAVORITE_RECIPE_IDS,
      payload: [56]
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favoriteRecipesIds).toEqual(action.payload);
  });

  it('should set favError when GET_USER_FAVORITE_RECIPE_IDS_FAILURE is passed', () => {
    const action = {
      type: types.GET_USER_FAVORITE_RECIPE_IDS_FAILURE,
      payload: 'An error occured'
    };
    const newState = RecipeReducer(initialState, action);
    expect(newState.favError).toEqual(action.payload);
  });
});
