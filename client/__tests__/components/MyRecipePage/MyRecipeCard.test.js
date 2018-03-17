import React from 'react';
import { shallow } from 'enzyme';
import MyRecipeCard from '../../../components/MyRecipePage/MyRecipeCard';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    index: 2,
    getRecipe: () => {},
    recipeDetails: MockData.recipeData
  };

  return shallow(<MyRecipeCard {...props} />);
};

describe('MyRecipeCard Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('div').length).toBe(8);
  });

  it('should get Details of recipe to be deleted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'getRecipeDetails');
    action.getRecipeDetails();
    expect(spy).toBeCalled();
  });
});
