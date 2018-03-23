import React from 'react';
import { shallow } from 'enzyme';
import { AuthHeader } from '../../../components/common/AuthHeader';
import MockData from '../../__mocks__/actions/recipes';


let props;

const setup = () => {
  props = {
    actions: {
      createRecipeAction: () => Promise.resolve(),
      logoutAction: () => {},
    },
    user: MockData.userData.profile
  };

  return shallow(<AuthHeader {...props} />);
};

describe('AuthHeader Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should set state of isUploading and progress when image upload starts', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const startUpload = jest.spyOn(action, 'handleUploadStart');
    action.handleUploadStart();
    expect(startUpload).toBeCalled();
    expect(wrapper.state('isUploading')).toBe(true);
    expect(wrapper.state('progress')).toBe(0);
  });

  it('should track state of progress when image is uploading', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const trackProgress = jest.spyOn(action, 'handleProgress');
    action.handleProgress(20);
    expect(trackProgress).toBeCalled();
    expect(wrapper.state('progress')).toBe(20);
  });

  it('should set state of input fields when input value changes', () => {
    const event = {
      target: { name: 'recipeName', value: 'Rice' }
    };
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleChange');
    action.handleChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('recipeName')).toBe('Rice');
  });

  it('should set state of backspaceRemoves when `toggleBackspaceRemoves` method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const toggleBackspace = jest.spyOn(action, 'toggleBackspaceRemoves');
    action.toggleBackspaceRemoves();
    expect(toggleBackspace).toBeCalled();
    expect(wrapper.state('backspaceRemoves')).toBe(false);
  });

  it('should clear error when input field is focused on', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    wrapper.setState({ errorMessage: 'Upload an image' });
    const clearError = jest.spyOn(action, 'onFocus');
    action.onFocus({ preventDefault: () => {} });
    expect(clearError).toBeCalled();
    expect(wrapper.state('errorMessage')).toBe('');
  });

  it('should set state of value when `onSearchChange` method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const search = jest.spyOn(action, 'onSearchChange');
    action.onSearchChange('recipe');
    expect(search).toBeCalled();
    expect(wrapper.state('value')).toBe('recipe');
  });

  it('should submit form to add recipe', () => {
    document.getElementById = () => ({ reset: jest.fn() });
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = jest.spyOn(action, 'handleSubmit');
    action.handleSubmit({ preventDefault: () => {} });
    expect(spy).toBeCalled();
  });
});
