import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinearProgressIndicator from '../../components/LinearProgressIndicator';

import * as selectors from './selectors';
import classes from './AxiosProgressIndicator.scss';

const AxiosProgressIndicator = ({ loading }) => {
  const className = loading ? classes.loading : classes.hidden;
  return (
    <LinearProgressIndicator
      className={[className, classes.root].join(' ')}
      data-aid="axios-progress-indicator"
    />
  );
};

AxiosProgressIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect(state => ({
  loading: selectors.isLoading(state),
}))(AxiosProgressIndicator);
