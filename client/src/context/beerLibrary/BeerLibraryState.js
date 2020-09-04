import React, { useReducer } from 'react';
import axios from 'axios';
import BeerLibraryContext from './beerLibraryContext';
import beerLibraryReducer from './beerLibraryReducer';
import {
  GET_BEER_LIBRARY,
  BEER_LIBRARY_ERROR,
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


  return (
    <BeerLibraryContext.Provider
      value={{
        beerLibrary: state.beerLibrary,
        loading: state.loading,
        error: state.error,
        getBeerLibrary
      }}
    >
      {props.children}
    </BeerLibraryContext.Provider>
  );
}

export default BeerLibraryState;
