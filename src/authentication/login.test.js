import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import { Login } from './login';
import config from '../config';
import { INITIAL_STATE } from '../application-state/initial-state';
import { login } from './actions';
import configureStore from '../application-state';
import { getAccessToken, removeAccessToken } from './access-token';


describe('Auth test', () => {
    let store;

    beforeEach(() => {
        fetch.resetMocks();
        store = configureStore();
        removeAccessToken();
    });

    afterAll(() => {
        fetch.resetMocks();
    });

    it('Login component renders correctly without error message', () => {
        const actions = { login: jest.fn() };

        const tree = renderer.create(<Login errorMessage={''} actions={actions}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Login component renders correctly with error message', () => {
        const actions = { login: jest.fn() };

        const tree = renderer.create(<Login errorMessage={'Bad credentials'} actions={actions}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('After clicking the button[submit] callback(login) is called out once', () => {
        const actions = { login: jest.fn() };
        const component = ReactTestUtils.renderIntoDocument(
            <Login actions={actions} errorMessage={''}/>,
        );
        const username = 'username';
        const password = 'password';

        fillUpUsernameField(component, username);
        fillUpPasswordField(component, password);
        clickSubmitButton(component);

        expectedCallbackOnFormSubmitCalledOnceWith(actions.login, username, password);
    });


    it('Test user can login in and his access token is stored', (done) => {
        expect.hasAssertions();
        const accessToken = 'FDFd3r56hh6h7h7h7h';
        fetch.mockResponse(JSON.stringify({ accessToken }), { status: 200 });

        store.dispatch(login('username', 'password'));

        store.subscribe(() => {
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}login`);
            expect(getAccessToken()).toEqual(accessToken);
            done();
        });
    });

    it('Test handle error when something went wrong', (done) => {
        expect.hasAssertions();
        const errorMessage = 'Something went wrong, try again.';
        const expectedState = { ...INITIAL_STATE, auth: { ...INITIAL_STATE.auth, errorMessage } };
        fetch.mockReject();

        store.dispatch(login('username', 'password'));

        store.subscribe(() => {
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}login`);
            expect(store.getState()).toEqual(expectedState);
            expect(getAccessToken()).toBeNull();
            done();
        });
    });

    it('Test handle error on bad credentials', (done) => {
        expect.hasAssertions();
        const errorMessage = 'Bad credentials.';
        const expectedState = { ...INITIAL_STATE, auth: { ...INITIAL_STATE.auth, errorMessage } };
        fetch.mockResponse(JSON.stringify({ errorMessage }), { status: 400 });

        store.dispatch(login('username', 'password'));

        store.subscribe(() => {
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}login`);
            expect(store.getState()).toEqual(expectedState);
            expect(getAccessToken()).toBeNull();
            done();
        });
    });
});

/**
 * @param {function} submitCallback - Submit callback
 * @param {string} username - Username
 * @param {string} password - Password
 */
const expectedCallbackOnFormSubmitCalledOnceWith = (submitCallback, username, password) => {
    expect(submitCallback.mock.calls.length).toBe(1);
    expect(submitCallback.mock.calls[0][0]).toEqual(username);
    expect(submitCallback.mock.calls[0][1]).toEqual(password);
};

/**
 * @param {React.Component} component - Component
 */
const clickSubmitButton = (component) => {
    const node = ReactDOM.findDOMNode(component);
    const button = node.querySelector('button[type="submit"]');
    ReactTestUtils.Simulate.click(button);
};

/**
 * @param {React.Component} component - Component
 * @param {string} username - Username
 */
const fillUpUsernameField = (component, username) => {
    const node = ReactDOM.findDOMNode(component);
    const field = node.querySelector('#username');

    field.value = username;
    ReactTestUtils.Simulate.change(field);
};

/**
 * @param {React.Component} component - Component
 * @param {string} password - Password
 */
const fillUpPasswordField = (component, password) => {
    const node = ReactDOM.findDOMNode(component);
    const field = node.querySelector('input[type="password"]');

    field.value = password;
    ReactTestUtils.Simulate.change(field);
};
