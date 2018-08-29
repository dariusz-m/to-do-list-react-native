import './style.less';

import React from 'react';
import { Provider } from 'react-redux';
import {
    Router, Route, Switch, Redirect,
} from 'react-router-dom';

import configureStore from './application-state';
import history from './browser-history';
import Tasks from './tasks/tasks';
import Login from './authentication/login';
import { isUserAuthenticated } from './authentication/auth';
import { ROUTING_PATH } from './routing';

/**
 *
 * @param {React.Component} Component - Protected component
 * @param {Object} rest - Rest of the properties
 * @returns {React.Component}
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isUserAuthenticated() ? <Component {...props} /> : <Redirect to={ROUTING_PATH.LOGIN} />
    )}/>
);

const store = configureStore();

/**
 * To-do app.
 * @returns {React.Component}
 */
export default () => (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <ProtectedRoute exact path={ROUTING_PATH.HOME} component={Tasks}/>
                <Route path={ROUTING_PATH.LOGIN} component={Login}/>
                <Redirect to={ROUTING_PATH.HOME}/>
            </Switch>
        </Router>
    </Provider>
);
