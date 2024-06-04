// modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// styles
import "./styles/index.scss";

// pages
import { Main } from './pages/Main';

// main code
const contain = document.getElementById('root');
const root = ReactDOM.createRoot(contain);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </React.StrictMode>
);
