import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice.js';
import productReducer from './cart/cartSlice.js';
import addressReducer from './userInfo/addressSlice.js';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  address: addressReducer,
});

export default rootReducer;
