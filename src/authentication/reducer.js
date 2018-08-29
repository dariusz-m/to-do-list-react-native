import { INITIAL_STATE } from '../application-state/initial-state';
import { LOGIN_FAILED, USER_HAS_BEEN_LOGGED_IN } from './actions';

/**
 * Authentication reducer
 * @param {Object} state - Authentication state
 * @param {{type: string, payload: Object}} action - Action
 * @returns {Object}
 */
export default (state = INITIAL_STATE.auth, action) => {
    switch (action.type) {
        case LOGIN_FAILED:
            return { ...state, errorMessage: action.payload.errorMessage };
        case USER_HAS_BEEN_LOGGED_IN:
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};
