import React from 'react';
import { mount } from 'enzyme';
import { Spinner } from 'react-preloading-component';
import { RecipeDetailsPage } from '../../../components/RecipeDetailsPage';
import RecipeInfo from '../../../components/RecipeDetailsPage/RecipeInfo';
import Reviews from '../../../components/RecipeDetailsPage/Reviews';
import MockData from '../../__mocks__/actions/recipes';

let props;


jest.mock('../../../components/common/AuthHeader.jsx', () => jest.fn(() => <div />));
const setup = () => {
  props = {
    actions: {
      getRecipeData: () => {},
      resetReviewError: jest.fn(),
      postReview: () => {},
      voteARecipe: jest.fn(),
      favoriteRecipe: jest.fn(),
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

  return mount(<RecipeDetailsPage {...props} />);
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
    const action = wrapper.instance();
    const submitReview = jest.spyOn(action, 'handleSubmit');
    wrapper.setState({ review: 'This is awesome' });
    const review = wrapper.find('#review-form');
    review.simulate('submit', { preventDefault: () => {} });
    expect(submitReview).toBeCalled();
    expect(wrapper.state('review')).toBe('');
  });

  it('should clear error when input field is focused on', () => {
    const wrapper = setup();
    const review = wrapper.find('.form-control');
    review.simulate('focus');
    expect(wrapper.prop('actions').resetReviewError).toBeCalled();
  });

  it('should set review when review input changes', () => {
    const wrapper = setup();
    const event = {
      target: { name: 'review', value: 'awesome stuff' }
    };
    const review = wrapper.find('.form-control');
    review.simulate('change', event);
    expect(wrapper.state('review')).toBe('awesome stuff');
  });

  it('should upvote recipe when upvote button is clicked', () => {
    const wrapper = setup();
    const upvote = wrapper.find('#upvote-button');
    upvote.simulate('click');
    expect(wrapper.prop('actions').voteARecipe).toBeCalled();
  });

  it('should downvote recipe when downvote button is clicked', () => {
    const wrapper = setup();
    const downvote = wrapper.find('#downvote-button');
    downvote.simulate('click');
    expect(wrapper.prop('actions').voteARecipe).toBeCalled();
  });

  it('should favorite recipe when favorite button is clicked', () => {
    const wrapper = setup();
    const favorite = wrapper.find('#favoriteButton');
    favorite.simulate('click');
    expect(wrapper.prop('actions').favoriteRecipe).toBeCalled();
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
