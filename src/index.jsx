import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/containers/App/App';
import configureStore from './app/store/store';
import * as serviceWorker from './serviceWorker';
import './assets/style.scss';
import history from './app/helpers';

const store = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
