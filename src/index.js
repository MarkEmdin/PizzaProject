import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Routes } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import './scss/app.scss';
import App from './App';
//<Provider store={store}>

ReactDOM.render(
  <Routes>
    <Provider store={store}>
      <App />
    </Provider>
  </Routes>,
  document.getElementById('root'),
);
