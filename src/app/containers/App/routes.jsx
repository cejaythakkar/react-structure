import React from 'react';

import loadable from '../../utils/loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export const Login = loadable(() => import('../Login'), {
  fallback: <LoadingIndicator />,
});

export default {};
