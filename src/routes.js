import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { NotFound } from './components/NotFound';
import LoginPage from './components/home/LoginPage';
import RegisterPage from './components/home/RegisterPage';

import ProfilePage from './components/about/ProfilePage';
import GamePage from './components/about/GamePage';
import ContactPage from './components/about/ContactPage';

const checkAuth = (store) => ((nextState, replace) => {
  let { appData: { loggedIn } } = store.getState();
  if (!loggedIn && nextState.location.pathname) {
    replace('/');
  }
});

export default function configRoutes(store) {
  return (<Route path="/" component={App}>
    <IndexRoute component={HomePage} getState={store.getState()} />
    <Route onEnter={checkAuth.call(this, store)}>
      <Route path="about" component={AboutPage}>
        <Route path="profile" component={ProfilePage} />
        <Route path="game" component={GamePage} />
        <Route path="contact" component={ContactPage} />
      </Route>
    </Route>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="*" component={NotFound} />
  </Route>);
}
