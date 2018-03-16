import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actionsCreator/recipes';
import * as types from '../../actions/types';
import mockData from '../__mocks__/actions/recipes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Recipe Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch GET_ALL_RECIPES and GET_ALL_RECIPES_SUCCESS when request to get all recipes is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.getAllRecipesSuccess
      });
    });

    const expectedActions = [
      {
        type: types.GET_ALL_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_ALL_RECIPES_SUCCESS,
        payload: mockData.getAllRecipesSuccess,
        pagination: mockData.getAllRecipesSuccess.pages,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAllRecipesAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_ALL_RECIPES and GET_ALL_RECIPES_FAILURE when request to get all recipes failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.getAllRecipesError
      });
    });

    const expectedActions = [
      {
        type: types.GET_ALL_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_ALL_RECIPES_FAILURE,
        payload: mockData.getAllRecipesError.error,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getAllRecipesAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_POPULAR_RECIPES and GET_POPULAR_RECIPES_SUCCESS when request to get popular recipes is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.getPopularRecipesSuccess
      });
    });

    const expectedActions = [
      {
        type: types.GET_POPULAR_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_POPULAR_RECIPES_SUCCESS,
        payload: mockData.getPopularRecipesSuccess,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPopularRecipesAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_POPULAR_RECIPES and GET_POPULAR_RECIPES_FAILURE when request to get popular recipes failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {
        type: types.GET_POPULAR_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_POPULAR_RECIPES_FAILURE,
        payload: mockData.error.error,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getPopularRecipesAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_RECIPE_DATA and GET_RECIPE_DATA_SUCCESS when request to get recipe details is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.recipeData
      });
    });

    const expectedActions = [
      {
        type: types.GET_RECIPE_DATA,
        isLoading: true
      },
      {
        type: types.GET_RECIPE_DATA_SUCCESS,
        payload: mockData.recipeData,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getRecipeData(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_RECIPE_DATA and GET_RECIPE_DATA_FAILURE when request to get recipe details failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.recipeDetailsError
      });
    });

    const expectedActions = [
      {
        type: types.GET_RECIPE_DATA,
        isLoading: true
      },
      {
        type: types.GET_RECIPE_DATA_FAILURE,
        payload: mockData.recipeDetailsError.message,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getRecipeData(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch CREATE_REVIEW and CREATE_REVIEW_SUCCESS when request to post review is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: mockData.reviewSuccess
      });
    });

    const expectedActions = [
      {
        type: types.CREATE_REVIEW,
        isLoading: true
      },
      {
        type: types.CREATE_REVIEW_SUCCESS,
        payload: mockData.reviewSuccess.review,
      }
    ];
    document.getElementById = () => ({ reset: jest.fn() });
    const store = mockStore({});
    return store.dispatch(actions.postReview(1, 'somestuff'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch CREATE_REVIEW and CREATE_REVIEW_FAILURE when request to post review failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.recipeDetailsError
      });
    });

    const expectedActions = [
      {
        type: types.CREATE_REVIEW,
        isLoading: true
      },
      {
        type: types.CREATE_REVIEW_FAILURE,
        payload: mockData.recipeDetailsError.message,
        isLoading: false
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.postReview(1, 'somestuff'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch VOTE_A_RECIPE_SUCCESS when request to vote a recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.voteRecipeResponse
      });
    });

    const expectedActions = [
      {

        type: types.VOTE_A_RECIPE_SUCCESS,
        payload: mockData.voteRecipeResponse
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.voteARecipe())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch VOTE_A_RECIPE_FAILURE when request to vote a recipe failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {

        type: types.VOTE_A_RECIPE_FAILURE,
        payload: mockData.error
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.voteARecipe())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch RESET_REVIEW_ERROR to clear review error', () => {
    const error = '';
    const expectedActions = [
      {
        type: types.RESET_REVIEW_ERROR,
        payload: error,
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.resetReviewError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch FAVORITE_RECIPE_SUCCESS when request to favorite recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.favoriteRecipeResponse
      });
    });

    const expectedActions = [
      {

        type: types.FAVORITE_RECIPE_SUCCESS,
        payload: mockData.favoriteRecipeResponse.message,
        recipeId: mockData.favoriteRecipeResponse.recipeId
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.favoriteRecipe(1, mockData.favoriteRecipeResponse))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch FAVORITE_RECIPE_FAILURE when request to favorite recipe failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {

        type: types.FAVORITE_RECIPE_FAILURE,
        payload: mockData.error.error
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.favoriteRecipe(1, mockData.favoriteRecipeResponse))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_RECIPES and GET_USER_RECIPES_SUCCESS when request to get user recipes is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.userRecipesSuccess
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_USER_RECIPES_SUCCESS,
        payload: mockData.userRecipesSuccess,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserRecipes(1, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_RECIPES and GET_USER_RECIPES_FAILURE when request to get user recipes is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_RECIPES,
        isLoading: true
      },
      {
        type: types.GET_USER_RECIPES_FAILURE,
        payload: mockData.error,
        isloading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserRecipes(1, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_FAVORITE_RECIPES and GET_USER_FAVORITE_RECIPES_SUCCESS when request to get user favorite recipes is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.favoriteRecipes
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_FAVORITE_RECIPE,
        isLoading: true
      },
      {
        type: types.GET_USER_FAVORITE_RECIPE_SUCCESS,
        payload: mockData.favoriteRecipes,
        count: mockData.favoriteRecipes.count,
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserFavRecipes(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_FAVORITE_RECIPES and GET_USER_FAVORITE_RECIPES_ERROR when request to get user favorite recipes failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_FAVORITE_RECIPE,
        isLoading: true
      },
      {
        type: types.GET_USER_FAVORITE_RECIPE_FAILURE,
        payload: mockData.error,
        isloading: false,
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserFavRecipes(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch FAVORITE_RECIPE_SUCCESS when request to remove favorite recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.favoriteRecipeResponse
      });
    });

    const expectedActions = [
      {

        type: types.FAVORITE_A_RECIPE_SUCCESS,
        payload: mockData.favoriteRecipeResponse.message,
        index: 0
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.favoriteARecipe(1, 20, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch FAVORITE_RECIPE_FAILURE when request to remove favorite recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {

        type: types.FAVORITE_A_RECIPE_FAILURE,
        payload: mockData.error.error,
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.favoriteARecipe(1, 20, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch  GET_USER_FAVORITE_RECIPE_IDS when request to get favorite recipes id is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.userFavoriteIds
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_FAVORITE_RECIPE_IDS,
        payload: mockData.userFavoriteIds.recipeIds
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getFavoriteIds(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch  GET_USER_FAVORITE_RECIPE_IDS_FAILURE when request to get favorite recipes id failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_FAVORITE_RECIPE_IDS_FAILURE,
        payload: mockData.error.error
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getFavoriteIds(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch VOTE_RECIPE when request to vote recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.voteRecipeResponse
      });
    });

    const expectedActions = [
      {
        type: types.VOTE_RECIPE,
        payload: mockData.voteRecipeResponse,
        index: 0
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.voteRecipeAction(27, 'upvotes', 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch CREATE_RECIPE when request to create recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.addRecipeResponse
      });
    });

    const expectedActions = [
      {
        type: types.CREATE_RECIPE,
        payload: mockData.addRecipeResponse,
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.createRecipeAction(mockData.recipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch EDIT_RECIPE when request to edit recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.editRecipeResponse
      });
    });

    const expectedActions = [
      {
        type: types.EDIT_RECIPE,
        payload: mockData.editRecipeResponse,
        index: 0
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.editRecipeAction(27, mockData.recipeData, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch DELETE_RECIPE when request to edit recipe is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.deleteRecipeResponse
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_RECIPE,
        position: 0
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.deleteRecipeAction(27, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_DATA and GET_USER_DATA_SUCCESS when request to get user data is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.userData
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_DATA,
        isLoading: true
      },
      {
        type: types.GET_USER_DATA_SUCCESS,
        payload: mockData.userData.profile,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserProfile(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch GET_USER_DATA and GET_USER_DATA_FAILURE when request to get user data failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockData.error
      });
    });

    const expectedActions = [
      {
        type: types.GET_USER_DATA,
        isLoading: true
      },
      {
        type: types.GET_USER_DATA_FAILURE,
        payload: mockData.error,
        isLoading: false
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserProfile(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
