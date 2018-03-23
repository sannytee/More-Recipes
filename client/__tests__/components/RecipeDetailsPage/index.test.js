import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'react-preloading-component';
import { RecipeDetailsPage } from '../../../components/RecipeDetailsPage';
import RecipeInfo from '../../../components/RecipeDetailsPage/RecipeInfo';
import Reviews from '../../../components/RecipeDetailsPage/Reviews';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    actions: {
      getRecipeData: () => {},
      resetReviewError: () => {},
      postReview: () => {},
      voteARecipe: () => {},
      favoriteRecipe: () => {},
    },
    params: {
      recipeId: 2
    },
    recipeDetails: MockData.recipeData,
    isLoading: false,
    user: MockData.userData.profile,
    error: null,
    reviewError: '',
    favoriteIds: MockData.userFavoriteIds.recipeIds
  };

  return shallow(<RecipeDetailsPage {...props} />);
};

localStorage.clear = () => {};
localStorage.setItem = () => {};
localStorage.getItem = () => {};


describe('RecipeDetailsPage Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(RecipeInfo).length).toBe(1);
    expect(wrapper.find(Reviews).length).toBe(1);
  });

  it('should submit review', () => {
    const wrapper = setup();
    wrapper.setState({ review: 'This is awesome' });
    const action = wrapper.instance();
    const submitReview = jest.spyOn(action, 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(submitReview).toBeCalled();
    expect(wrapper.state('review')).toBe('');
  });

  it('should clear error when input field is focused on', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const clearError = jest.spyOn(action, 'onFocus');
    action.onFocus({ preventDefault: () => {} });
    expect(clearError).toBeCalled();
  });

  it('should set review when review input changes', () => {
    const wrapper = setup();
    const event = {
      target: { name: 'review', value: 'awesome stuff' }
    };

    const action = wrapper.instance();
    const setReview = jest.spyOn(action, 'handleChange');
    action.handleChange(event);
    expect(setReview).toBeCalled();
    expect(wrapper.state('review')).toBe('awesome stuff');
  });

  it('should upvote recipe when upvote method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const upvoteRecipe = jest.spyOn(action, 'upvoteARecipe');
    action.upvoteARecipe();
    expect(upvoteRecipe).toBeCalled();
  });

  it('should downvote recipe when downvote method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const downvoteRecipe = jest.spyOn(action, 'downvoteARecipe');
    action.downvoteARecipe();
    expect(downvoteRecipe).toBeCalled();
  });

  it('should favorite recipe when favorite method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const favoriteRecipe = jest.spyOn(action, 'favoriteRecipe');
    action.favoriteRecipe();
    expect(favoriteRecipe).toBeCalled();
  });

  it('should render loader when `isLoading` is true', () => {
    const wrapper = setup();
    wrapper.setProps({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  it('should render error when error exists', () => {
    const wrapper = setup();
    wrapper.setProps({ error: 'Recipe not found' });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('404 Not found');
  });
});
