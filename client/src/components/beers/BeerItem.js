import React from 'react';

const BeerItem = ({ beer }) => {
  // const onClick = () => {
  //   console.log(`${beer.name} clicked!`);
  // }
  return (
    <div className="beer-item-card">
      <img src={beer.labels.large} alt="" className="beer-item-img" />
    </div>
  )
}

export default BeerItem;
