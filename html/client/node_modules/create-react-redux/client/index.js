import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Router, browserHistory } from 'react-router';
import { AUTH_USER } from './actions/types';
import routes from './routes';

import configureStore from './store';

const store = configureStore({})
const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in
if(token) {
  //we need to update the application state
  store.dispatch({ type : AUTH_USER});
}

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
