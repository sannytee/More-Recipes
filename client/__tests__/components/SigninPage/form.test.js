import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/SigninPage/Form';

let props;

const setup = () => {
  props = {
    error: {},
    onChange: () => {},
    onSubmit: () => {},
    onFocus: () => {},
  };

  return shallow(<Form {...props} />);
};

describe('Signin Form Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error if error exist', () => {
    const wrapper = setup();
    wrapper.setProps({ error: { error: 'User not found' } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').at(0).text()).toBe('User not found');
  });
});
