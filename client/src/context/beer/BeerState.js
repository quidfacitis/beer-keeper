import React, { useReducer } from 'react';
import axios from 'axios';
import BeerContext from './beerContext';
import beerReducer from './beerReducer';
import {
  GET_BEERS,
  BEER_ERROR,
  RESET_LOADING,
} from '../types';

const BeerState = props => {
  const initialState = {
    beers: null,
    beersLoading: true,
    error: null
  }
  const [state, dispatch] = useReducer(beerReducer, initialState);

  // Get beers
  const getBeers = async () => {
    try {
      const res = await axios.get('/api/beers');
      const beersWithLabels = res.data.filter(beer => beer.labels && beer.labels.large ? true : false);
      const beersWithLabelsAndStyle = beersWithLabels.filter(beer => beer.style ? true : false);
      dispatch({
        type: GET_BEERS,
        payload: beersWithLabelsAndStyle
      });
    } catch (err) {
      dispatch({
        type: BEER_ERROR,
        payload: err.response.message
      });
    }
  };

  // set beersLoading to true
  const resetLoading = () => {
    dispatch({
      type: RESET_LOADING
    })
  }

  return (
    <BeerContext.Provider
      value={{
        beers: state.beers,
        beersLoading: state.beersLoading,
        error: state.error,
        getBeers,
        resetLoading
      }}
    >
      {props.children}
    </BeerContext.Provider>
  );
}

export default BeerState;
