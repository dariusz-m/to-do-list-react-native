import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import { INITIAL_STATE } from './initial-state';
import rootSaga from './sagas';

/**
 * Configure store.
 * @param {Object} initialState: Initial state for application state.
 * @returns {Object}
 */
export default function configureStore(initialState = INITIAL_STATE) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
