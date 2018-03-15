import React from 'react';
import { mount } from 'enzyme';
import LandingPageComponent from '../../../components/LandingPage/index';


describe('LandingPage Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<LandingPageComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
