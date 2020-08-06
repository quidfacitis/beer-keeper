import React from 'react';

const BeerItem = ({ beer }) => {
  return (
    <div style={{ display: 'inline-block'}}>
      <p>{beer.name}</p>
      <img src={beer.labels.large} alt="t" width="200" height="200" />
    </div>
  )
}

export default BeerItem;
