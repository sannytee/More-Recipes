import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actionsCreator/recipes';
import * as types from '../../actions/types';
import mockData from '../__mocks__/actions/recipes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const description = {
  message1: 'when request to get all recipes',
  message2: 'should dispatch GET_ALL_RECIPES',
  message3: 'should dispatch GET_POPULAR_RECIPES',
  message4: 'when request to get popular recipes',
  message5: 'should dispatch GET_RECIPE_DATA',
  message6: 'when request to get recipe details',
  message7: 'should dispatch CREATE_REVIEW',
  message8: 'when request to post review',
  message9: 'when request to vote a recipe',
  newMessage1: 'should dispatch GET_USER_RECIPES',
  newMessage2: 'when request to get user recipes',
  newMessage3: 'should dispatch GET_USER_FAVORITE_RECIPES',
  newMessage4: 'when request to get user favorite recipes',
  newMessage5: 'when request to remove favorite recipe',
  newMessage6: 'when request to get favorite recipes id',
  newMessage7: 'should dispatch GET_USER_DATA',
  newMessage8: 'when request to get user data'
};

describe('Recipe Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`${description.message2} and GET_ALL_RECIPES_SUCCESS ${description.message1} passed`, () => {
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

  it(`${description.message2} and GET_ALL_RECIPES_FAILURE ${description.message1} failed`, () => {
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

  it(`${description.message3} and GET_POPULAR_RECIPES_SUCCESS ${description.message4} passed`, () => {
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

  it(`${description.message3} and GET_POPULAR_RECIPES_FAILURE ${description.message4}  failed`, () => {
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

  it(`${description.message5} and GET_RECIPE_DATA_SUCCESS ${description.message6} passed`, () => {
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

  it(`${description.message5} and GET_RECIPE_DATA_FAILURE ${description.message6} failed`, () => {
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

  it(`${describe.message7} and CREATE_REVIEW_SUCCESS ${description.message8} passed`, () => {
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

  it(`${describe.message7} and CREATE_REVIEW_FAILURE ${description.message8} failed`, () => {
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

  it(`should dispatch VOTE_A_RECIPE_SUCCESS ${description.message9} is successful`, () => {
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

  it(`should dispatch VOTE_A_RECIPE_FAILURE ${description.message9} failed`, () => {
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

  it('should dispatch FAVORITE_RECIPE_SUCCESS when request to favorite recipe passed', () => {
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

  it(`${description.newMessage1} and GET_USER_RECIPES_SUCCESS ${description.newMessage2} passed`, () => {
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

  it(`${description.newMessage1} and GET_USER_RECIPES_FAILURE ${description.newMessage2} failed`, () => {
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

  it(`${description.newMessage3} and GET_USER_FAVORITE_RECIPES_SUCCESS ${description.newMessage4} passed`, () => {
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

  it(`${description.newMessage3} and GET_USER_FAVORITE_RECIPES_ERROR ${description.newMessage4} failed`, () => {
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

  it(`should dispatch FAVORITE_RECIPE_SUCCESS ${description.newMessage5} passed`, () => {
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
        id: 20
      }
    ];

    const recipe = {
      recipeId: 20
    };

    const userId = 1;

    const store = mockStore({});
    return store.dispatch(actions.favoriteARecipe(userId, recipe))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`should dispatch FAVORITE_RECIPE_FAILURE ${description.newMessage5} failed`, () => {
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

  it(`should dispatch  GET_USER_FAVORITE_RECIPE_IDS ${description.newMessage6} passed`, () => {
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

  it(`should dispatch  GET_USER_FAVORITE_RECIPE_IDS_FAILURE ${description.newMessage6} failed`, () => {
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
        identifier: 27
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
        recipeId: 27
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.deleteRecipeAction(27, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`${description.newMessage7} and GET_USER_DATA_SUCCESS ${description.newMessage7} passed`, () => {
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

  it(`${description.newMessage7} and GET_USER_DATA_FAILURE ${description.newMessage7} failed`, () => {
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
