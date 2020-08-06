import {
  GET_BEERS,
  BEER_ERROR
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
    default:
      return state;
  }
}
