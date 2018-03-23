import React from 'react';
import { shallow } from 'enzyme';
import PopularRecipeCard from '../../../components/RecipePage/PopularRecipeCard';

let props;

const setup = () => {
  props = {
    recipeName: 'fried rice',
    id: 5,
    image: 'image'
  };

  return shallow(<PopularRecipeCard {...props} />);
};

describe('Popular Recipe card component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').at(2).text()).toBe('fried rice');
  });
});
