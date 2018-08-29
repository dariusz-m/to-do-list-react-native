import createHistory from 'history/createBrowserHistory';

const history = createHistory();

/**
 * Redirect to path.
 *
 * @param {string} path: Path
 * */
export function redirectTo(path) {
    history.push(path);
}

export default history;
