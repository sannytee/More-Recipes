import React from 'react';
import { mount } from 'enzyme';
import { SigninPage } from '../../../components/SigninPage/index';

describe('Signin component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      authenticated: '',
      error: '',
      actions: {
        resetUserError: () => {},
        signinAction: () => {}
      }
    };
    wrapper = mount(<SigninPage {...props} />);
  });

  it('should  render correctly', () => {
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

  it('should set error when username input is focused on', () => {
    wrapper.setState({ error: 'user not found' });

    const event = {
      target: { name: 'username', value: '' }
    };

    wrapper.find('input').at(0).simulate('focus', event);
    expect(wrapper.state('error')).toBe('');
  });

  it('should set error when password input is focused on', () => {
    wrapper.setState({ error: 'invalid details' });

    const event = {
      target: { name: 'password', value: '' }
    };

    wrapper.find('input').at(1).simulate('focus', event);
    expect(wrapper.state('error')).toBe('');
  });

  it('should return  state when no input is on focused', () => {
    wrapper.setState({ error: 'invalid details' });

    const event = {
      target: { name: '', value: '' }
    };

    wrapper.find('input').at(0).simulate('focus', event);
    expect(wrapper.state('error')).toBe('invalid details');
  });

  it('should signin user when form is submitterd', () => {
    const action = wrapper.instance();
    const signin = jest.spyOn(wrapper.instance(), 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(signin).toBeCalled();
  });
});
