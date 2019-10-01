import React from 'react';
import PropTypes from 'prop-types';

import classes from './LinearProgressIndicator.scss';

const LinearProgressIndicator = ({ className, ...rest }) => (
  <div className={[classes.root, className].join(' ')} {...rest} />
);

LinearProgressIndicator.defaultProps = {
  className: [],
};

LinearProgressIndicator.propTypes = {
  className: PropTypes.string,
};

export default LinearProgressIndicator;
