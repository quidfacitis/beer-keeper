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

  return (
    <div className="beer-library-item-card">
      {name && <p>{name}</p>}
      {type && <p>{type}</p>}
      {abv && <p>{abv}</p>}
      {description && <p>{description}</p>}
      {rating && <p>{rating}</p>}
      <button onClick={onDelete}>Delete</button>
      <button onClick={() => setCurrentBeer(beer)}>Edit</button>
    </div>
  )
}

export default BeerLibraryItem;
