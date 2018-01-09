import { combineReducers } from 'redux';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipesReducer
});

export default rootReducer;
