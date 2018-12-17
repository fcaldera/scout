import {
  FETCH_EXCHANGES_STARTED,
  FETCH_EXCHANGES_SUCCESS,
  FETCH_EXCHANGES_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  exchangeRates: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXCHANGES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EXCHANGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        exchangeRates: action.payload,
      };
    case FETCH_EXCHANGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
