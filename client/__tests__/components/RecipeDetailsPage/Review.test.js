import React from 'react';
import { shallow } from 'enzyme';
import Review from '../../../components/RecipeDetailsPage/Reviews';
import MockData from '../../__mocks__/actions/recipes';

let props;

const setup = () => {
  props = {
    reviews: MockData.recipeData.reviews,
    handleSubmit: () => {},
    handleChange: () => {},
    onFocus: () => {},
    reviewError: '',
  };

  return shallow(<Review {...props} />);
};

describe('Review Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Submit');
  });

  it('should render message if recipe have not been reviewed', () => {
    const wrapper = setup();
    wrapper.setProps({ reviews: [] });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h6').text()).toBe('This recipe have not been reviewed');
  });

  it('should render error if error exists', () => {
    const wrapper = setup();
    wrapper.setProps({ reviewError: 'Review cannot be Empty' });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').at(4).text()).toBe('Review cannot be Empty');
  });
});
