import React from 'react';
import Beers from './components/beers/Beers';

import BeerState from './context/beer/BeerState';
import './App.css';

function App() {
  return (
    <BeerState>
      <div className="App">
        <Beers />
      </div>
    </BeerState>
  );
}

export default App;
