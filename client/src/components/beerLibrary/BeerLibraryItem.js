import React, { useContext } from 'react';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';

const BeerLibraryItem = ({ beer }) => {
  const beerLibraryContext = useContext(BeerLibraryContext);
  const { deleteBeer, setCurrentBeer, clearCurrentBeer } = beerLibraryContext;

  const {
    _id,
    name,
    type,
    abv,
    description,
    rating
  } = beer;

  const onDelete = () => {
    deleteBeer(_id);
    clearCurrentBeer();
  };

  const ratingStars = [];

  for (let i=1; i <= 5; i++ ) {
    if (i <= rating) {
      ratingStars.push(<span key={i} className="material-icons" style={{color: '#14213D'}}>star_rate</span>);
    } else {
      ratingStars.push(<span key={i} className="material-icons" style={{color: '#E5E5E5'}}>star_rate</span>);
    }
  }

  return (
    <div className="beer-library-item-card">
      {name && <p>{name}</p>}
      {type && <p>{type}</p>}
      {abv && <p>{abv}</p>}
      {description && <p>{description}</p>}
      {<p>{ratingStars}</p>}
      <button onClick={onDelete}>Delete</button>
      <button onClick={() => setCurrentBeer(beer)}>Edit</button>
    </div>
  )
}

export default BeerLibraryItem;
