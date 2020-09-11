import React, { useState, useContext } from 'react';
import hops from './hops.png';
import AuthContext from '../../context/auth/authContext';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';

const ShowcasedBeer = ({ beer }) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const beerLibraryContext = useContext(BeerLibraryContext);
  const { addBeer } = beerLibraryContext;

  const [ descriptionIsClosed, setDescriptionIsClosed ] = useState(true);

  const {
    abv,
    name,
    labels,
    style
  } = beer;

  const summaryText = style.description.slice(0, 300);

  const onAddBeer = () => {
    addBeer({
      name,
      type: style.name,
      abv,
      imgURL: labels.large
    });
  };

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
            {isAuthenticated && <button onClick={onAddBeer}>Add to library</button>}
          </div>
        </div>
        <div className="showcased-beer-img">
          <img src={labels.large} alt="" className="beer-item-img"/>
        </div>
      </div>
      {descriptionIsClosed ? (
        <p onClick={() => setDescriptionIsClosed(false)} className="description-cursor"><span className="material-icons" style={{verticalAlign: 'middle'}}>arrow_right</span>{summaryText}...</p>
      ) : (
        <p onClick={() => setDescriptionIsClosed(true)} className="description-cursor"><span className="material-icons" style={{verticalAlign: 'middle'}}>arrow_drop_down</span>{style.description}</p>
      )}
    </div>
  )
}

export default ShowcasedBeer;
