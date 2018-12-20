import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = state => createStore(rootReducer, state, applyMiddleware(thunk));

export default store;
