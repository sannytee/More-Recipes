import { combineReducers } from 'redux';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';
import signupReducer from './signupReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  createUser: signupReducer
});

export default rootReducer;
