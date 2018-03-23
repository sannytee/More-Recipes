import React from 'react';
import { mount } from 'enzyme';
import LandingPageComponent from '../../../components/LandingPage';


describe('LandingPage Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<LandingPageComponent />);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Carousel').length).toBe(1);
    expect(wrapper.find('AboutSection').length).toBe(1);
    expect(wrapper.find('Footer').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
