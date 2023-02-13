import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {store} from '../src/Redux/Reducer';
import { AppProvider } from './context';


ReactDOM.render(
  <Provider store = {store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById('root')
);
