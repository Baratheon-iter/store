import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer.js'
import productsReducer from './productReducer'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  chat: userInfoReducer,
  products: productsReducer,
  routing: routerReducer
})

export default reducers;