import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware  from 'redux-thunk';

import reducers from './index'

const compose = (param) => param;

const store = createStore(combineReducers(reducers), compose(applyMiddleware(thunkMiddleware)));

window.getState = store.getState;

export default store;
