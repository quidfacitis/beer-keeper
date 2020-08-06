import React, { useContext, useState } from 'react';
import BeerItem from './BeerItem';
import BeerContext from '../../context/beer/beerContext';

const Beers = () => {

  const beerContext = useContext(BeerContext);
  const { beers, beersLoading, getBeers } = beerContext;

  const [displayedBeersPage, setDisplayedBeersPage] = useState(1);

  let displayedBeers = [];
  const beerMiniPageButtons = [];

  if (!beersLoading) {
    displayedBeers = []
    const numBeerMiniPages = beers.length % 10;
    console.log(numBeerMiniPages);

    if (displayedBeersPage === numBeerMiniPages) {
      for (let i = ((displayedBeersPage - 1) * 10); i < beers.length; i++) {
        displayedBeers.push(beers[i]);
      }
    } else {
      for (let i = ((displayedBeersPage - 1) * 10); i < (displayedBeersPage * 10); i++) {
        displayedBeers.push(beers[i]);
      }
    }

    for (let i = 1; i <= numBeerMiniPages; i++) {
      beerMiniPageButtons.push(<button key={i} onClick={() => setDisplayedBeersPage(i)}>{i}</button>);
    }
  }

  return (
    <div>
      <button onClick={getBeers}>Find new beers</button>

      {!beersLoading && displayedBeers.map(beer => <BeerItem key={beer.id} beer={beer} />)}
      {!beersLoading && beerMiniPageButtons}
    </div>
  )
};

export default Beers;
