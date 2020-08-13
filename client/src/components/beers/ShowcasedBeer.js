import React from 'react';

const ShowcasedBeer = ({ beer }) => {
  const {
    abv,
    name,
    labels,
    style
  } = beer;

  return (
    <div>
      <div className="medium-container">
        <div className="half-container">
          <p>{name}</p>
          <p>{style.name}</p>
          <p>Abv: {abv}</p>
        </div>
        <div className="half-container">
          <img src={labels.large} alt="" className="beer-item-img"/>
        </div>
      </div>
      <p>{style.description}</p>
    </div>
  )
}

export default ShowcasedBeer;
