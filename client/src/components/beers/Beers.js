import React, { useContext, useState } from 'react';
import BeerItem from './BeerItem';
import ShowcasedBeer from './ShowcasedBeer';
import BeerContext from '../../context/beer/beerContext';

const Beers = () => {

  const beerContext = useContext(BeerContext);
  const { beers, beersLoading, getBeers } = beerContext;
  console.log(beers);
  console.log(beersLoading);

  const [displayedBeersPage, setDisplayedBeersPage] = useState(1);

  const beerMiniPageButtons = [];
  let displayedBeers = [];

  if (!beersLoading && beers !== null) {
    let numBeerMiniPages = Math.ceil(beers.length / 10);
    console.log(`Beers length is: ${beers.length}`)
    console.log(`numBeerMiniPages is: ${numBeerMiniPages}`);

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
    console.log(`displayedBeers: ${displayedBeers}`);
  }

  return (
    <div>
      <div className="centered">
        <button onClick={getBeers}>Find new beers</button>
      </div>
      <div className="centered">
        {!beersLoading && <ShowcasedBeer beer={displayedBeers[0]}/>}
      </div>
      <div className="centered">
        {!beersLoading && displayedBeers.map(beer => <BeerItem key={beer.id} beer={beer} />)}
      </div>
      <div className="centered">
        {!beersLoading && beerMiniPageButtons}
      </div>
    </div>
  )
};

export default Beers;
