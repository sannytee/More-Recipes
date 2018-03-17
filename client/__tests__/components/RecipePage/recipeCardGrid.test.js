import React from 'react';
import { shallow } from 'enzyme';
import MockData from '../../__mocks__/actions/recipes';
import RecipeCardGrid from '../../../components/RecipePage/recipeCardGrid';


let props;

const setup = () => {
  props = {
    allRecipes: MockData.getAllRecipesSuccess.allRecipes
  };

  return shallow(<RecipeCardGrid {...props} />);
};


describe('RecipeCardGrid Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('h2').text()).toBe('Recipes');
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper).toMatchSnapshot();
  });
});
