import {
  GET_BEERS,
  BEER_ERROR,
  RESET_LOADING,
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_BEERS:
      return {
        ...state,
        beers: action.payload,
        beersLoading: false
      }
    case BEER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case RESET_LOADING:
      return {
        ...state,
        beersLoading: true
      }
    default:
      return state;
  }
}
