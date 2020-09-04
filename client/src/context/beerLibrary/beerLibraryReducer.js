import {
  GET_BEER_LIBRARY,
  BEER_LIBRARY_ERROR,
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_BEER_LIBRARY:
      return {
        ...state,
        beerLibrary: action.payload,
        loading: false
      }
    case BEER_LIBRARY_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
