import React, { useState } from 'react';
import hops from './hops.png';

const ShowcasedBeer = ({ beer }) => {

  const [ descriptionIsClosed, setDescriptionIsClosed ] = useState(true);

  const {
    abv,
    name,
    labels,
    style
  } = beer;

  const summaryText = style.description.slice(0, 250);

  return (
    <div>
      <div className="medium-container">
        <div className="showcased-beer-text">
          <div className="showcased-beer-text-column">
            <p>{name}</p>
            <img src={hops} alt='' className="hops-divider" />
            <p>{style.name}</p>
            <img src={hops} alt='' className="hops-divider" />
            <p>Abv: {abv}</p>
          </div>
        </div>
        <div className="showcased-beer-img">
          <img src={labels.large} alt="" className="beer-item-img"/>
        </div>
      </div>
      {descriptionIsClosed ? (
        <details onClick={() => setDescriptionIsClosed(false)} className="description-cursor">
          <summary>
            {summaryText}...
          </summary>
        </details>
      ) : (
        <p onClick={() => setDescriptionIsClosed(true)} className="description-cursor"><span className="material-icons" style={{verticalAlign: 'middle'}}>arrow_drop_down</span>{style.description}</p>
      )}
    </div>
  )
}

export default ShowcasedBeer;
