import React from 'react';
import { shallow } from 'enzyme';
import AddRecipeForm from '../../../components/common/AddRecipeForm';


let props;

const setup = () => {
  props = {
    errorMessage: '',
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    onFocus: jest.fn(),
    isUploading: false,
    progress: 0,
    handleProgress: () => {},
    handleUploadStart: () => {},
    handleUploadSuccess: () => {},
    notReady: true,
    mealType: '',
  };

  return shallow(<AddRecipeForm {...props} />);
};

describe('AddRecipeForm Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should render error if error exists', () => {
    const wrapper = setup();
    wrapper.setProps({ errorMessage: 'select a meal type' });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert').text()).toBe('select a meal type');
  });

  it('should call handleChange method when input value changes', () => {
    const wrapper = setup();
    const review = wrapper.find('#method-text');
    review.simulate('change');
    expect(props.handleChange).toBeCalled();
  });

  it('should call onFocus method when input is focused on', () => {
    const wrapper = setup();
    const form = wrapper.find('#message-text');
    form.simulate('focus');
    expect(props.onFocus).toBeCalled();
  });

  it('should call handleSubmit method when submit button is clicked', () => {
    const wrapper = setup();
    const form = wrapper.find('#recipeForm');
    form.simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
});
