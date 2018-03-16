import React from 'react';
import { mount } from 'enzyme';
import { SignupPage } from '../../../components/SignupPage/index';


describe('SignupPage component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      actions: {
        resetUserError: () => {},
        signUpAction: () => {},
      }
    };
    wrapper = mount(<SignupPage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set username state when username input value changes', () => {
    const event = {
      target: { name: 'username', value: '' }
    };

    event.target.value = 'tywo';
    wrapper.find('input').at(0).simulate('change', event);
    expect(wrapper.state('username')).toBe('tywo');
  });

  it('should set usernameError when username input box is focused on', () => {
    wrapper.setState({ usernameError: 'user already exist' });

    const event = {
      target: { name: 'username', value: '' }
    };
    wrapper.find('input').at(0).simulate('focus', event);
    expect(wrapper.state('usernameError')).toBe('');
  });

  it('should set emailError when email input box is focused on', () => {
    wrapper.setState({ emailError: 'email already exist' });

    const event = {
      target: { name: 'email', value: '' }
    };
    wrapper.find('input').at(1).simulate('focus', event);
    expect(wrapper.state('emailError')).toBe('');
  });

  it('should set confirmPasswordError when confirmPassword input box is focused on', () => {
    wrapper.setState({ confirmPasswordError: 'password does not match' });

    const event = {
      target: { name: 'confirmPassword', value: '' }
    };
    wrapper.find('input').at(3).simulate('focus', event);
    expect(wrapper.state('confirmPasswordError')).toBe('');
  });

  it('should return state if none of the input is on focused', () => {
    const event = {
      target: { name: '', value: '' }
    };
    wrapper.find('input').at(3).simulate('focus', event);
    expect(wrapper.state('confirmPasswordError')).toBe('');
  });

  it('should set username Error when it recieves error props with `This username already exist`', () => {
    wrapper.setProps({ error: 'This username already exist' });
    expect(wrapper.state('usernameError')).toBe('This username already exist');
  });

  it('should set username Error when it recieves error props with `Username is required`', () => {
    wrapper.setProps({ error: 'Username is required' });
    expect(wrapper.state('usernameError')).toBe('Username is required');
  });

  it('should set username Error when it recieves error props with `Username must be greater than 5`', () => {
    wrapper.setProps({ error: 'Username must be greater than 5' });
    expect(wrapper.state('usernameError')).toBe('Username must be greater than 5');
  });

  it('should set email Error when it recieves error props with `This email already exists`', () => {
    wrapper.setProps({ error: 'This email already exists' });
    expect(wrapper.state('emailError')).toBe('This email already exists');
  });

  it('should set confirmPassword Error when it recieves error props with `Password does not match`', () => {
    wrapper.setProps({ error: 'Password does not match' });
    expect(wrapper.state('confirmPasswordError')).toBe('Password does not match');
  });

  it('should set error when error props is not specified', () => {
    wrapper.setProps({ error: 'server error' });
    expect(wrapper.state('error')).toBe('server error');
  });

  it('should register user when form is submitted', () => {
    const action = wrapper.instance();
    const signup = jest.spyOn(wrapper.instance(), 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(signup).toBeCalled();
  });
});
