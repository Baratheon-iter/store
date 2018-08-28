import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
<<<<<<< HEAD
import Login from './Login.jsx';
import store from './store';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

=======
import store from './store.js';
>>>>>>> master

render(
  <Provider store = {store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => (<App />)}/>
        <Route path='/login' render={() => (<Login/>)} />
      </Switch>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);

