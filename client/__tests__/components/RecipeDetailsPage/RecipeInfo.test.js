import React from 'react';
import { shallow } from 'enzyme';
import RecipeInfo from '../../../components/RecipeDetailsPage/RecipeInfo';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    recipeDetails: MockData.recipeData,
    upvote: () => {},
    downvote: () => {},
    favorite: () => {},
    favorited: true,
  };

  return shallow(<RecipeInfo {...props} />);
};

describe('RecipeInfo', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h6').length).toBe(3);
    expect(wrapper.find('button').length).toBe(3);
  });
});
