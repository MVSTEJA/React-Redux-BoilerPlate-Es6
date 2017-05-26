/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configRoutes from './routes';
import 'fontfaceobserver';

const openSansObserver = new FontFaceObserver('Open Sans');//eslint-disable-line no-undef

import './styles/main.scss'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import initialState from './reducers/initialState';
const store = configureStore(initialState);

const routes = configRoutes(store);

openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, (err) => {
  document.body.classList.remove('js-open-sans-loaded');
}).then(() =>{
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
});