import React from 'react';
import { shallow } from 'enzyme';
import PopularRecipeCardList from '../../../components/RecipePage/popularRecipeCardList';
import PopularRecipeCard from '../../../components/RecipePage/popularRecipeCard';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    popularRecipes: MockData.getPopularRecipesSuccess
  };

  return shallow(<PopularRecipeCardList {...props} />);
};

describe('PopularRecipeCardList Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('div').at(2).text()).toBe('Popular Recipes');
    expect(wrapper.find(PopularRecipeCard).length).toBe(6);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper).toMatchSnapshot();
  });
});
