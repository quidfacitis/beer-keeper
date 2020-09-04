import React, { useReducer } from 'react';
import axios from 'axios';
import BeerLibraryContext from './beerLibraryContext';
import beerLibraryReducer from './beerLibraryReducer';
import {
  GET_BEER_LIBRARY,
  BEER_LIBRARY_ERROR,
  ADD_BEER,
  ADD_BEER_ERROR
} from '../types';

const BeerLibraryState = props => {
  const initialState = {
    beerLibrary: null,
    loading: true,
    error: null
  }
  const [state, dispatch] = useReducer(beerLibraryReducer, initialState);

  // Get beer library
  const getBeerLibrary = async () => {
    try {
      const res = await axios.get('api/beers');
      dispatch({
        type: GET_BEER_LIBRARY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BEER_LIBRARY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add beer

  const addBeer = async beer => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('api/beers', beer, config);
      dispatch({
        type: ADD_BEER,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: ADD_BEER_ERROR,
        payload: err.response.msg
      })
    }

  };

  return (
    <BeerLibraryContext.Provider
      value={{
        beerLibrary: state.beerLibrary,
        loading: state.loading,
        error: state.error,
        getBeerLibrary,
        addBeer
      }}
    >
      {props.children}
    </BeerLibraryContext.Provider>
  );
}

export default BeerLibraryState;
