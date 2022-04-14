import { combineReducers } from 'redux';
import filterReducer from './filters';
import pizzasReducer from './pizzas';
import cartReducer from './cart';

const routReducer = combineReducers({
  filter: filterReducer,
  pizza: pizzasReducer,
  cart: cartReducer,
});

export default routReducer;
