import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../components/common/NotFound';

describe('NotFound Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
