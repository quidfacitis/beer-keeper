import React, { useContext, useEffect } from 'react';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';
// import AuthContext from '../../context/auth/authContext';
import BeerLibraryItem from './BeerLibraryItem';
import BeerForm from './BeerForm';

const BeerLibrary = () => {

  const beerLibraryContext = useContext(BeerLibraryContext);
  const { getBeerLibrary, beerLibrary, loading } = beerLibraryContext;

  // PENDING -- don't allow a non-logged-in user to access '/api/beerlibrary'
  // const authContext = useContext(AuthContext);
  // const { isAuthenticated } = authContext;


  useEffect(() => {
    getBeerLibrary();
  // eslint-disable-next-line
  }, []);

  return (
    <div className="beer-library-container">
      <div className="beer-form-width">
        <BeerForm />
      </div>
      <div className="beer-library-item-width">
        {beerLibrary !== null && beerLibrary.map(beer => <BeerLibraryItem key={beer._id} beer={beer}/>)}
      </div>

    </div>
  )
}

export default BeerLibrary;
