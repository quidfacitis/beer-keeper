import React, { useReducer } from 'react';
import axios from 'axios';
import BeerLibraryContext from './beerLibraryContext';
import beerLibraryReducer from './beerLibraryReducer';
import {
  GET_BEER_LIBRARY,
  ADD_BEER,
  DELETE_BEER,
  SET_CURRENT_BEER,
  CLEAR_CURRENT_BEER,
  UPDATE_BEER,
  LOAD_BEER_IMAGES,
  CLEAR_BEER_IMAGES,
  BEER_LIBRARY_ERROR
} from '../types';

const BeerLibraryState = props => {
  const initialState = {
    beerLibrary: null,
    loading: true,
    error: null,
    current: null,
    beerImages: null
  }
  const [state, dispatch] = useReducer(beerLibraryReducer, initialState);

  // Get beer library
  const getBeerLibrary = async () => {
    try {
      const res = await axios.get('api/beers');
      const beerImageArray = [];
      for (let i=0; i < res.data.length; i++) {
        beerImageArray.push({
          _id: res.data[i]._id,
          images: []
        });
      }
      console.log(`BEER IMAGE OBJECT: ${beerImageArray}`);

      const beerLibraryAndImageArray = {
        beerLibrary: res.data,
        beerImageArray
      };

      dispatch({
        type: GET_BEER_LIBRARY,
        payload: beerLibraryAndImageArray
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
        type: BEER_LIBRARY_ERROR,
        payload: err.response.msg
      })
    }
  };

  // Delete beer
  const deleteBeer = async beerId => {
    try {
      await axios.delete(`api/beers/${beerId}`);
      dispatch({
        type: DELETE_BEER,
        payload: beerId
      });
    } catch (err) {
      dispatch({
        type: BEER_LIBRARY_ERROR,
        payload: err.response.msg
      });
    }
  }

  // Set current beer
  const setCurrentBeer = beer => {
    dispatch({
      type: SET_CURRENT_BEER,
      payload: beer
    });
  };

  // Clear current beer
  const clearCurrentBeer = () => dispatch({ type: CLEAR_CURRENT_BEER });

  // Update beer
  const updateBeer = async beer => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(`api/beers/${beer._id}`, beer, config);
      dispatch({
        type: UPDATE_BEER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BEER_LIBRARY_ERROR,
        payload: err.response.msg
      });
    }
  }

  // Load beer images
  const loadBeerImages = async (beerName, _id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('api/beerImages', beerName, config);
      const imagesAndId = {
        images: res.data,
        _id
      };
      dispatch({
        type: LOAD_BEER_IMAGES,
        payload: imagesAndId
      });
    } catch (err) {
      dispatch({
        type: BEER_LIBRARY_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearBeerImages = _id => {
    try {
      dispatch({
        type: CLEAR_BEER_IMAGES,
        payload: _id
      });
    } catch (err)  {
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
        current: state.current,
        beerImages: state.beerImages,
        error: state.error,
        getBeerLibrary,
        addBeer,
        deleteBeer,
        setCurrentBeer,
        clearCurrentBeer,
        updateBeer,
        loadBeerImages,
        clearBeerImages
      }}
    >
      {props.children}
    </BeerLibraryContext.Provider>
  );
}

export default BeerLibraryState;
