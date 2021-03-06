import React from 'react';
import axios from 'axios';
import { createRoutesFromChildren, Route, Routes } from 'react-router-dom';
//import { renderIntoDocument } from 'react-dom/test-utils';
import { Header } from './components';
import { Home, Cart } from './pages';
//import { useDispatch } from 'react-redux';
import { fetchPizzas } from './redux/actions/pizzas';
//import { applyMiddleware } from 'redux';

function App() {
  //const hraniliche = useSelector((state) => state);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
