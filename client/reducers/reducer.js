import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer.js'
import productsReducer from './productReducer'

const reducers = combineReducers({
  chat: userInfoReducer,
  products: productsReducer
})

export default reducers;