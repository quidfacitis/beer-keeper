import {
  GET_BEER_LIBRARY,
  ADD_BEER,
  DELETE_BEER,
  SET_CURRENT_BEER,
  CLEAR_CURRENT_BEER,
  UPDATE_BEER,
  LOAD_BEER_IMAGES,
  BEER_LIBRARY_ERROR
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_BEER_LIBRARY:
      return {
        ...state,
        beerLibrary: action.payload.beerLibrary,
        loading: false,
        beerImages: action.payload.beerImageArray
      }
    case ADD_BEER:
      return {
        ...state,
        beerLibrary: [action.payload, ...state.beerLibrary],
        loading: false
      }
    case DELETE_BEER:
      return {
        ...state,
        beerLibrary: state.beerLibrary.filter(beer => beer._id !== action.payload),
        loading: false
      }
    case SET_CURRENT_BEER:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT_BEER:
      return {
        ...state,
        current: null
      }
    case UPDATE_BEER:
      return {
        ...state,
        beerLibrary: state.beerLibrary.map(beer => beer._id === action.payload._id ? action.payload : beer),
        loading: false
      }
    case LOAD_BEER_IMAGES:
      return {
        ...state,
        beerImages: state.beerImages.map(beerImage => beerImage._id === action.payload._id ? { _id: beerImage._id, images: action.payload.images} : beerImage)
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
