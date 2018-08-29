export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const USER_HAS_BEEN_LOGGED_IN = 'USER_HAS_BEEN_LOGGED_IN';

/**
 * Login user.
 * @param {string} username - Username
 * @param {string} password - User password
 * @returns {{type: string, payload: {email: string, password: string}}}
 */
export const login = (username, password) => ({
    type: LOGIN,
    payload: {
        username,
        password,
    },
});


/**
 * Login failed
 * @param {string} errorMessage - Error message
 * @returns {{type: string, errorMessage: string}}
 */
export const loginFailed = errorMessage => ({
    type: LOGIN_FAILED,
    payload: {
        errorMessage,
    },
});

/**
 * User has been logged in.
 * @returns {{type: string}}
 */
export const userHasBeenLoggedIn = () => ({
    type: USER_HAS_BEEN_LOGGED_IN,
});
