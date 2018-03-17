import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  MyRecipePage
} from '../../../components/MyRecipePage/index';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    user: MockData.userData.profile,
    actions: {
      logoutAction: () => {},
      getUserRecipes: () => {},
      deleteRecipeAction: () => Promise.resolve(),
      editRecipeAction: () => Promise.resolve(),
    },
    userRecipes: MockData.userRecipesSuccess.userRecipes,
    isLoading: false,
    pages: MockData.userRecipesSuccess.pages
  };

  return shallow(<MyRecipePage {...props} />);
};

localStorage.clear = () => {};
localStorage.getItem = () => {};

describe('MyRecipePage Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render message if user have no recipe', () => {
    const wrapper = setup();
    wrapper.setProps({ userRecipes: [] });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('You do not have any recipe');
  });

  it('should delete recipe when the delete button is clicked', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleDeletion');
    action.handleDeletion();
    expect(spy).toBeCalled();
  });

  it('should submit edit recipe form', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });


  it('should set state of input field', () => {
    const event = {
      target: { name: 'recipeName', value: 'Rice' }
    };
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleChange');
    action.handleChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('recipe').recipeName).toBe('Rice');
  });


  it('should clear error message when form input is focused on', () => {
    const wrapper = setup();
    wrapper.setState({ errorMessage: 'Invalid' });
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'onFocus');
    action.onFocus();
    expect(spy).toBeCalled();
    expect(wrapper.state('errorMessage')).toBe('');
  });
});
