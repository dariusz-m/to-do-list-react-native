import createHistory from 'history/createMemoryHistory';

export const ROUTING_PATH = {
    LOGIN: '/login',
    HOME: '/',
};

export const history = createHistory();

/**
 * Redirect to path.
 *
 * @param {string} path: Path
 * */
export function redirectTo(path) {
    history.push(path);
}
