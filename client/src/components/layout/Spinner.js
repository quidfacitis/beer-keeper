import React, { Fragment } from 'react';
import beerSpinner from './beer_spinner.gif';

const Spinner = () => <Fragment>
      <img src={beerSpinner} alt="Loading..." className="beer-library-item-img"/>
    </Fragment>

export default Spinner;
