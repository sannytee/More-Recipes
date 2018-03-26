import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../../components/LandingPage/Carousel';


describe('Carousel Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Carousel />);
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('img').length).toBe(3);
    expect(wrapper).toMatchSnapshot();
  });
});
