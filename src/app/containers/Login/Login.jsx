import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import reducerRegistry from '../../reducer-registry';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { NAME } from './constants';

// Register your reducer here
reducerRegistry.register(NAME, reducer);

class Login extends PureComponent {
  componentDidMount() {
    const { getEmployees } = this.props;
    getEmployees();
  }

  onLoginClick = () => {
    const { username, password, login } = this.props;
    login(username, password);
  };

  render() {
    const { username, password, isLoading, setUsername, setPassword } = this.props;
    return (
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <input value={password} onChange={e => setPassword(e.target.value)} />

        <button type="button" onClick={this.onLoginClick}>
          {isLoading ? 'logging in...' : 'Login'}
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,

  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    username: selectors.getUserName(state),
    password: selectors.getPassword(state),
    isLoading: selectors.getLoading(state),
  }),
  {
    login: actions.login,
    setUsername: actions.setUserName,
    setPassword: actions.setPassword,
    getEmployees: actions.getEmployees,
  }
)(Login);
