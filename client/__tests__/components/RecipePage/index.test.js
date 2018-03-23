import React from 'react';
import { shallow } from 'enzyme';
import { RecipePage } from '../../../components/RecipePage';
import MockData from '../../__mocks__/actions/recipes';

let props;

localStorage.clear = () => {};
localStorage.getItem = () => {};
localStorage.setItem = () => {};

const setup = () => {
  props = {
    popularRecipes: MockData.getPopularRecipesSuccess,
    recipes: MockData.getAllRecipesSuccess.allRecipes,
    page: MockData.getAllRecipesSuccess.pages,
    user: MockData.userData.profile,
    actions: {
      getAllRecipesAction: () => {},
      getPopularRecipesAction: () => {},
      changeAuthAction: () => {},
    },
    isauthenticated: true,
    isLoading: false,

  };

  return shallow(<RecipePage {...props} />);
};


describe('RecipePage component', () => {
  it('should render correctly for logged in user', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for user not logged in', () => {
    const wrapper = setup();
    wrapper.setProps({ isauthenticated: false });
    expect(wrapper).toMatchSnapshot();
  });
});
