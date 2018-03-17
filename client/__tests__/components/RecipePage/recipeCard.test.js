import React from 'react';
import { mount } from 'enzyme';
import { RecipeCard } from '../../../components/RecipePage/recipeCard';

let props;
const err = {
  response: {
    data: {
      message: 'Session has expired'
    }
  }
};
const setup = () => {
  props = {
    actions: {
      voteRecipeAction: () => Promise.reject(err),
      changeAuthAction: () => {},
    },
    id: 1,
    i: 1,
    recipeName: 'Rice',
    upvotes: 3,
    downvotes: 0,
    image: 'image',
    user: 'tywo'
  };

  return mount(<RecipeCard {...props} />, { context: {} });
};

describe('Recipe card component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should toast error for upvoting recipe when session expired', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'upvoteRecipe');
    action.upvoteRecipe({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });

  it('should toast error for downpvoting recipe when session expired', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'downvoteRecipe');
    action.downvoteRecipe({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });

  it('should toast error for upvoting recipe when user is not logged in', () => {
    const wrapper = setup();
    const err = {
      response: {
        data: {
          message: 'not logged in'
        }
      }
    };
    wrapper.setProps({
      actions: { voteRecipeAction: () => Promise.reject(err) }
    });
    const action = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'upvoteRecipe');
    action.upvoteRecipe({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });

  it('should toast error for downvoting recipe when user is not logged in', () => {
    const wrapper = setup();
    const err = {
      response: {
        data: {
          message: 'not logged in'
        }
      }
    };
    wrapper.setProps({
      actions: { voteRecipeAction: () => Promise.reject(err) }
    });
    const action = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance(), 'downvoteRecipe');
    action.downvoteRecipe({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });
});
