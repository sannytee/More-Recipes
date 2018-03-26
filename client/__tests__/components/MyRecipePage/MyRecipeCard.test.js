import React from 'react';
import { mount } from 'enzyme';
import MyRecipeCard from '../../../components/MyRecipePage/MyRecipeCard';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    index: 2,
    getRecipe: jest.fn(),
    recipeDetails: MockData.recipeData
  };

  return mount(<MyRecipeCard {...props} />);
};

describe('MyRecipeCard Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('div').length).toBe(10);
  });

  it('should get Details of recipe to be deleted', () => {
    const wrapper = setup();
    const getRecipeDetails = wrapper.find('#modalEdit');
    getRecipeDetails.simulate('click');
    expect(wrapper.prop('getRecipe')).toBeCalled();
  });
});
