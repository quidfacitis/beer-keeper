import React, { useContext, useState } from 'react';
import BeerItem from './BeerItem';
import ShowcasedBeer from './ShowcasedBeer';
import BeerContext from '../../context/beer/beerContext';

const Beers = () => {

  const beerContext = useContext(BeerContext);
  const { beers, beersLoading, getBeers, resetLoading } = beerContext;
  console.log(beers);
  console.log(beersLoading);

  const [displayedBeersPage, setDisplayedBeersPage] = useState(1);
  const [showcasedBeer, setShowcasedBeer] = useState(null);

  const beerMiniPageButtons = [];
  let displayedBeers = [];

  const findNewBeers = () => {
    resetLoading();
    console.log(`beersLoading is now ${beersLoading}`);
    setShowcasedBeer(null);
    getBeers();
  }

  const onMiniPageButtonClick = (pageNum) => {
    setShowcasedBeer(null);
    setDisplayedBeersPage(pageNum);
  };

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
      beerMiniPageButtons.push(<button key={i} onClick={() => onMiniPageButtonClick(i)}>{i}</button>);
    }
    console.log(`displayedBeers: ${displayedBeers}`);
  }


  return (
    <div>
      <div className="centered">
        <button onClick={findNewBeers} className="big-btn">Find new beers</button>
      </div>

      <div className="title-container">
        <div className="displayed-beer-column">
          {!beersLoading && displayedBeers.slice(0, 5).map((beer, i) => (
            <span onClick={() => setShowcasedBeer(beer)} key={i}>
              <BeerItem key={beer.id} beer={beer} />
            </span>
          ))}
        </div>
        <div>
          {!beersLoading && <ShowcasedBeer beer={showcasedBeer === null ? displayedBeers[0] : showcasedBeer}/>}
        </div>
        <div className="displayed-beer-column">
          {!beersLoading && displayedBeers.slice(5).map((beer, i) => (
            <span onClick={() => setShowcasedBeer(beer)} key={i}>
              <BeerItem key={beer.id} beer={beer} />
            </span>
          ))}
        </div>
        
      </div>

      {/* <div className="centered">

      </div>
      <div className="centered">
        {!beersLoading && displayedBeers.map((beer, i) => (
          <span onClick={() => setShowcasedBeer(beer)} key={i}>
            <BeerItem key={beer.id} beer={beer} />
          </span>
        ))}
      </div> */}
      <div className="centered">
        {!beersLoading && beerMiniPageButtons}
      </div>
    </div>
  )
};

export default Beers;
