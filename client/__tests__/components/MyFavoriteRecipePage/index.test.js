import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'react-preloading-component';
import { FavoriteRecipePage } from '../../../components/MyFavoriteRecipePage/index';
import MockData from '../../__mocks__/actions/recipes';


let props;

const favoriteRecipes = {
  favorited: [
    {
      id: 50,
      userId: 1,
      recipeId: 27,
      createdAt: '2018-03-14T14:07:46.635Z',
      updatedAt: '2018-03-14T14:07:46.635Z',
      Recipe: {
        id: 27,
        recipeName: 'new recipe',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F702446f3-a2c2-48c7-a9d1-af20be9281d7.jpeg?alt=media&token=1827adb2-4108-4939-9fe0-778e27dd5212',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,
        downvotes: 1,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-20T10:11:25.020Z',
        updatedAt: '2018-03-14T19:26:34.054Z'
      }
    },
    {
      id: 53,
      userId: 1,
      recipeId: 52,
      createdAt: '2018-03-14T14:08:14.406Z',
      updatedAt: '2018-03-14T14:08:14.406Z',
      Recipe: {
        id: 52,
        recipeName: 'Asaro',
        image: 'https://firebasestorage.googleapis.com/v0/b/more-recipes-3be20.appspot.com/o/images%2F37726346-c5d3-4069-b8d9-3834fc3b0cec.jpg?alt=media&token=af75ca04-f982-4815-bed4-1f011be7f0d1',
        mealType: 'elevenses',
        description: 'An awesome Africa recipe made from yam',
        method: 'Boil the water first\nwash the vegetables\ngrind the pepper.\nand so on.',
        ingredients: 'Yam, vegetable, pepper, palm oil, stock fish',
        upvotes: 0,
        downvotes: 0,
        userId: 1,
        addedBy: 'sannytee',
        createdAt: '2018-02-27T09:51:21.439Z',
        updatedAt: '2018-03-06T11:07:45.393Z'
      }
    }
  ]
};

const setup = () => {
  props = {
    actions: {
      getUserFavRecipes: () => {},
    },
    user: MockData.userData.profile,
    favoriteRecipes,
    recipeDetails: MockData.recipeData,
    isLoading: false
  };

  return shallow(<FavoriteRecipePage {...props} />);
};

localStorage.clear = () => {};
localStorage.getItem = () => {};
localStorage.setItem = () => {};

describe('MyFavoriteRecipePage Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h2').text()).toBe('My Favorite Recipes');
  });

  it('should render loader if `isLoading` is true', () => {
    const wrapper = setup();
    wrapper.setProps({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  it('should render message if user have no recipe', () => {
    const wrapper = setup();
    wrapper.setProps({ favoriteRecipes: { favorited: [] } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('You have no favorite recipes');
  });
});

