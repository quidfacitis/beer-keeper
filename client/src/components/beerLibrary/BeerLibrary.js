import React, { Fragment, useContext, useEffect } from 'react';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';
import BeerLibraryItem from './BeerLibraryItem';

const BeerLibrary = () => {

  const beerLibraryContext = useContext(BeerLibraryContext);
  const { getBeerLibrary, beerLibrary, loading } = beerLibraryContext;

  useEffect(() => {
    getBeerLibrary();
  // eslint disable next line
  }, []);

  return (
    <Fragment>
      {beerLibrary !== null && beerLibrary.map(beer => <BeerLibraryItem key={beer._id} beer={beer}/>)}
    </Fragment>
  )
}

export default BeerLibrary;
