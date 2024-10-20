import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



reportWebVitals();
