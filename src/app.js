import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {
    Router, Route, Switch, Redirect,
} from 'react-router';

import Tasks from './tasks/tasks';
import Login from './authentication/login';
import { isUserAuthenticated } from './authentication/auth';
import { ROUTING_PATH, history } from './routing';
import configureStore from './application-state';

const store = configureStore();

/**
 *
 * @param {React.Component} Component - Protected component
 * @param {boolean} isAuthenticated - Is user authenticated
 * @param {Object} rest - Rest of the properties
 * @returns {React.Component}
 */
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? <Component {...props} /> : <Redirect to={ROUTING_PATH.LOGIN} />
    )}/>
);


/**
 * Application component
 */
class App extends React.Component {
    state = {
        isAuthenticated: false,
    };

    /**
     * Run when component just have mounted.
     */
    async componentDidMount() {
        try {
            const isAuthenticated = await isUserAuthenticated();
            this.setState({ isAuthenticated });
        } catch (err) {
            this.setState({ isAuthenticated: false });
        }
    }

    /**
     * Render
     * @returns {string}
     */
    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Router history={history}>
                        <Switch>
                            <Route path={ROUTING_PATH.LOGIN} component={Login}/>
                            <ProtectedRoute
                                isAuthenticated={this.state.isAuthenticated}
                                path={ROUTING_PATH.HOME}
                                component={Tasks}
                            />
                        </Switch>
                    </Router>
                </Provider>
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
