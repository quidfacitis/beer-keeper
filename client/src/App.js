import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Beers from './components/beers/Beers';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Register from './components/auth/Register';
import BeerState from './context/beer/BeerState';
import './App.css';

function App() {
  return (
    <BeerState>
      <Router>
        <Navbar />
        <div className="app-container">
          <Switch>
            <Route exact path='/' component={Beers} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    </BeerState>
  );
}

export default App;
