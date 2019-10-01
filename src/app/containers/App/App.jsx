import { connect } from 'react-redux';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import reducerRegistry from '../../reducer-registry';
import history from '../../helpers';
import AxiosProgressIndicator from '../AxiosProgressIndicator';

import { Login } from './routes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { NAME } from './constants';

reducerRegistry.register(NAME, reducer);

toast.configure({ position: toast.POSITION.BOTTOM_CENTER });

const App = () => (
  <Router history={history}>
    <AxiosProgressIndicator />
    <Switch>
      <Route
        path="/"
        exact
        component={() => (
          <div>
            In Home Page
            <div>
              <Link to="/login">Login</Link>
            </div>
          </div>
        )}
      />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default connect(
  state => ({
    isLoading: selectors.getLoading(state),
    data: selectors.getData(state),
  }),
  {
    setData: actions.setData,
  }
)(App);
