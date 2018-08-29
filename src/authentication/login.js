import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from './actions';

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
     * @param {Event} changeEvent: Change event.
     */
    usernameChange = (changeEvent) => {
        this.setState({ username: changeEvent.target.value });
    };

    /**
     * On password change.
     *
     * @param {Event} changeEvent: Change event.
     */
    passwordChange = (changeEvent) => {
        this.setState({ password: changeEvent.target.value });
    };

    /**
     * Login.
     *
     * @param {Event} clickEvent: Click event.
     */
    login = (clickEvent) => {
        this.props.actions.login(this.state.username, this.state.password);
        this.setState({ password: '' });
        clickEvent.preventDefault();
    };

    /**
     * Render component.
     *
     * @returns {React.Element}
     */
    render() {
        return (
            <form className="form-signin mt-5">
                <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text" id="username" className="form-control" placeholder="Username" required
                    autoFocus value={this.state.username} onChange={this.usernameChange}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                    required value={this.state.password} onChange={this.passwordChange}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>
                    Sign in
                </button>
                {this.props.errorMessage
                    ? <div className="alert alert-danger">
                        <strong>Login failed!</strong> {this.props.errorMessage}
                    </div> : null
                }
            </form>
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
