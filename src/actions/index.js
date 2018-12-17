import axios from 'axios';

export const EXCHANGE_REQUEST = 'EXCHANGE_REQUEST';
export const EXCHANGE_SUCCESS = 'EXCHANGE_SUCCESS';
export const EXCHANGE_FAILURE = 'EXCHANGE_FAILURE';

export function fetchExchanges() {
  return dispatch => {
    dispatch(fetchStarted());

    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(res => dispatch(fetchSuccess(res.data)))
      .catch(err => dispatch(fetchError(err)));
  };
}

function fetchStarted() {
  return {
    type: EXCHANGE_REQUEST,
  };
}

function fetchSuccess(data) {
  return {
    type: EXCHANGE_SUCCESS,
    payload: data,
  };
}

function fetchError(error) {
  return {
    type: EXCHANGE_SUCCESS,
    payload: error,
  };
}
