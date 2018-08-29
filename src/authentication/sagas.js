import { call, put } from 'redux-saga/effects';

import config from '../config';
import { redirectTo } from '../browser-history';
import { storeAccessToken } from './access-token';
import { loginFailed, userHasBeenLoggedIn } from './actions';
import { ROUTING_PATH } from '../routing';

/**
 * Login in.
 * @param {{type: string, payload: {username: string, password: string}}} action - Action
 */
export function* login(action) {
    try {
        const response = yield call(
            fetch,
            `${config.API_URL}login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: action.payload.username, password: action.payload.password }),
            },
        );
        const responseData = yield call([response, response.json]);
        if (response.status === 200) {
            yield call(storeAccessToken, responseData.accessToken);
            yield call(redirectTo, ROUTING_PATH.HOME);
            yield put(userHasBeenLoggedIn());
        } else {
            yield put(loginFailed(responseData.errorMessage));
        }
    } catch (error) {
        yield put(loginFailed('Something went wrong, try again.'));
    }
}
