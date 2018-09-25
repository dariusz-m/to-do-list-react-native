import { createStore, applyMiddleware } from 'redux';
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
        applyMiddleware(sagaMiddleware),
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    sagaMiddleware.run(rootSaga);

    return store;
}
