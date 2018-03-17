import React from 'react';
import { shallow } from 'enzyme';
import { FavoriteRecipeCard } from '../../../components/MyFavoriteRecipePage/FavoriteRecipeCard';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    actions: {
      favoriteARecipe: () => {},
    },
    userId: 1,
    recipe: MockData.recipeData,
    index: 1,
  };

  return shallow(<FavoriteRecipeCard {...props} />);
};

describe('FavroiteRecipeCard', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should remove recipe from favorites when the favoriteRecipe method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'favoriteRecipe');
    action.favoriteRecipe();
    expect(spy).toBeCalled();
  });
});
