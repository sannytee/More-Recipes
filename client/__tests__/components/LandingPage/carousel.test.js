import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../../components/LandingPage/carousel';


describe('Carousel Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Carousel />);
    expect(wrapper).toMatchSnapshot();
  });
});
