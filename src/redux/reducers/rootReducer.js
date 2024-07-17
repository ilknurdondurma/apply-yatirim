import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducers';
import themeReducer from './themeReducers';

const Reducers = combineReducers({
  counter: counterReducer, // hey counter gel buraa diye cagıracagız
  theme: themeReducer,
});

export default Reducers;
 