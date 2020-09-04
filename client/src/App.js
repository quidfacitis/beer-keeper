import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Beers from './components/beers/Beers';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import BeerLibrary from './components/beerLibrary/BeerLibrary';

import BeerState from './context/beer/BeerState';
import AuthState from './context/auth/AuthState';
import BeerLibraryState from './context/beerLibrary/BeerLibraryState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BeerLibraryState>
        <BeerState>
          <Router>
            <Navbar />
            <div className="app-container">
              <Switch>
                <Route exact path='/' component={Beers} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/beerlibrary' component={BeerLibrary} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Router>
      </BeerState>
    </BeerLibraryState>
  </AuthState>
  );
}

export default App;
