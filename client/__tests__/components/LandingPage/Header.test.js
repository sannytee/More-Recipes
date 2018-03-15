import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/LandingPage/header';


describe('Header Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
