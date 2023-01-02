import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice.js';
import productReducer from './cart/cartSlice.js';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

export default rootReducer;
