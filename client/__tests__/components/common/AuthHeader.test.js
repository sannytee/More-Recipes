import React from 'react';
import { mount } from 'enzyme';
import { AuthHeader } from '../../../components/common/AuthHeader';
import MockData from '../../__mocks__/actions/recipes';


jest.mock('react-firebase-image-uploader', () => jest.fn(() => <div />));

let props;

const setup = () => {
  props = {
    actions: {
      createRecipeAction: jest.fn(() => Promise.resolve()),
      logoutAction: jest.fn(),
    },
    user: MockData.userData.profile
  };

  return mount(<AuthHeader {...props} />);
};

describe('AuthHeader Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(5);
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
    action.handleProgress(20);
    expect(wrapper.state('progress')).toBe(20);
  });

  it('should set state of input fields when input value changes', () => {
    const event = {
      target: { name: 'recipeName', value: 'Rice' }
    };
    const wrapper = setup();
    const editRecipeName = wrapper.find('#recipe-name');
    editRecipeName.simulate('change', event);
    expect(wrapper.state('recipeName')).toBe('Rice');
  });

  it('should set state of backspaceRemoves when `toggleBackspaceRemoves` method is called', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    action.toggleBackspaceRemoves();
    expect(wrapper.state('backspaceRemoves')).toBe(false);
  });

  it('should clear error when input field is focused on', () => {
    const wrapper = setup();
    wrapper.setState({ errorMessage: 'Upload an image' });
    const editRecipeName = wrapper.find('#recipe-name');
    editRecipeName.simulate('focus');
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
    const addRecipeForm = wrapper.find('#recipeForm');
    addRecipeForm.simulate('submit');
    expect(wrapper.prop('actions').createRecipeAction).toBeCalled();
  });
});
