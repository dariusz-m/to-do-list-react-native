const ACCESS_TOKEN_KEY = 'access-token';

/**
 * Store user access token
 * @param {string} token - Access token
 */
export const storeAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Get access token from storage
 * @returns {string | null}
 */
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

/**
 * Remove access token.
 */
export const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};
