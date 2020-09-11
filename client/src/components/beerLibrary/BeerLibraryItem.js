import React, { useContext } from 'react';
import hops from '../beers/hops.png';
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
    rating,
    imgURL
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
      <div className="top-flex-container-beer-library-item">
        <div className="top-left-container-beer-library-item">
          {name && <p>{name}</p>}
          {type && <p>{type}</p>}
          {abv && <p>{abv}</p>}
          {<p>{ratingStars}</p>}
        </div>
        <div className="top-right-container-beer-library-item">
          <img src={imgURL ? imgURL : hops} alt='' className='beer-item-img' />
        </div>
      </div>
      <div className="middle-flex-container-beer-library-item">
        {description && <p><em>{description}</em></p>}
      </div>
      <div className="bottom-flex-container-beer-library-item">
        <button onClick={onDelete} className="buttons-beer-library-item">Delete </button>
        <span className="button-divider"> | </span>
        <button onClick={() => setCurrentBeer(beer)} className="buttons-beer-library-item">Edit</button>
      </div>
    </div>
  )
}

export default BeerLibraryItem;
