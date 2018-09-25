import { AsyncStorage } from 'react-native';

const ACCESS_TOKEN_KEY = 'access-token';

/**
 * Store user access token
 * @param {string} token - Access token
 */
export const storeAccessToken = async (token) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {}
};

/**
 * Get access token from storage
 * @returns {string | null}
 */
export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        return null;
    }
};

/**
 * Remove access token.
 */
export const removeAccessToken = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {}
};
