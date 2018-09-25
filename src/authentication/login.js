import React from 'react';
import { Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from './actions';
import Input from '../shared-components/input';

/**
 * Login component.
 */
export class Login extends React.Component {
    static propTypes = {
        errorMessage: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            login: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        username: '',
        password: '',
    };

    /**
     * On username change.
     *
     * @param {string} value: Input value
     */
    usernameChange = (value) => {
        this.setState({ username: value });
    };

    /**
     * On password change.
     *
     * @param {string} value: Input value
     */
    passwordChange = (value) => {
        this.setState({ password: value });
    };

    /**
     * Login.
     */
    login = () => {
        this.props.actions.login(this.state.username, this.state.password);
        this.setState({ password: '' });
    };

    /**
     * Render component.
     *
     * @returns {JSXElement}
     */
    render() {
        return (
            <View style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Sign In</Text>
                <Input
                    placeholder={'username...'}
                    onChange={this.usernameChange}
                    label={'Username: '}
                    autoCorrect={true}
                    secureTextEntry={false}
                    value={this.state.username}
                />
                <Input
                    placeholder={'password...'}
                    onChange={this.passwordChange}
                    label={'Password: '}
                    autoCorrect={true}
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <Button onPress={this.login} title={'Sign in'} color={'blue'}/>
                {this.props.errorMessage
                    ? <Text style={{ color: 'red', textAlign: 'center' }}>
                        <Text>Login failed!{'\n'}</Text>
                        <Text>{this.props.errorMessage}</Text>
                    </Text> : null
                }
            </View>
        );
    }
}

/**
 * Map state to props.
 *
 * @param {Object} state: State of application
 *
 * @returns {Object}
 */
function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
    };
}

/**
 * Map state to props.
 *
 * @param {Object} dispatch: Dispatch
 *
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            login,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
