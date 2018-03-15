import React from 'react';
import { shallow } from 'enzyme';
import AboutSection from '../../../components/LandingPage/aboutSection';


describe('AboutSection Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AboutSection />);
    expect(wrapper).toMatchSnapshot();
  });
});
