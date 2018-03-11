/**
 * Created by tegaadigu on 11/03/2018.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

export default createStore( reducers, undefined, compose( applyMiddleware( thunk, promise, createLogger() ) ) );
