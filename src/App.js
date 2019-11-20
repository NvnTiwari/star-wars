import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';
import Login from './containers/Login';
import Search from './containers/Search';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login"><Login /></Route>
        <Route path="/search"><Search /></Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}


export default App;
