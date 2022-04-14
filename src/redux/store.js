import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import routReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(routReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
