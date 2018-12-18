import axios from 'axios';

export const FETCH_EXCHANGES_STARTED = 'FETCH_EXCHANGES_STARTED';
export const FETCH_EXCHANGES_SUCCESS = 'FETCH_EXCHANGES_SUCCESS';
export const FETCH_EXCHANGES_FAILURE = 'FETCH_EXCHANGES_FAILURE';
export const RESET_ERROR = 'RESET_ERROR';

export function fetchExchanges() {
  return dispatch => {
    dispatch(fetchStarted());

    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(res => dispatch(fetchSuccess(res.data)))
      .catch(err => dispatch(fetchError(err)));
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

function fetchStarted() {
  return {
    type: FETCH_EXCHANGES_STARTED,
  };
}

function fetchSuccess(data) {
  return {
    type: FETCH_EXCHANGES_SUCCESS,
    payload: data,
  };
}

function fetchError(error) {
  return {
    type: FETCH_EXCHANGES_FAILURE,
    payload: error,
  };
}
