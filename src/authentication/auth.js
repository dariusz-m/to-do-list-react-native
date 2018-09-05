import { getAccessToken } from './access-token';

/**
 * Is user authenticated
 * @returns {boolean}
 */
export const isUserAuthenticated = async () => await getAccessToken() !== null;
