import React from 'react';

const BeerLibraryItem = ({ beer }) => {

  const {
    name,
    type,
    abv,
    description,
    rating
  } = beer;

  return (
    <div>
      {name && <p>{name}</p>}
      {type && <p>{type}</p>}
      {abv && <p>{abv}</p>}
      {description && <p>{description}</p>}
      {rating && <p>{rating}</p>}
    </div>
  )
}

export default BeerLibraryItem;
