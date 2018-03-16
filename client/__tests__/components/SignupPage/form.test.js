import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/SignupPage/form';

const value = {
  usernameError: '',
  emailError: '',
  confirmPasswordError: '',
};

let props;

const setup = () => {
  props = {
    value,
    onChange: () => {},
    onFocus: () => {},
    handleSubmit: () => {},
  };

  return shallow(<Form {...props} />);
};


describe('Signup Form component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error when username error exist', () => {
    const wrapper = setup();
    wrapper.setProps({ value: { usernameError: 'User already exist' } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').at(0).text()).toBe('User already exist');
  });

  it('should render error when email error exist', () => {
    const wrapper = setup();
    wrapper.setProps({ value: { emailError: 'Email already exist' } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').at(0).text()).toBe('Email already exist');
  });

  it('should render error when password error exist', () => {
    const wrapper = setup();
    wrapper.setProps({ value: { confirmPasswordError: 'Password does not match' } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').at(0).text()).toBe('Password does not match');
  });
});
