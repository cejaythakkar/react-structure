import { createSelectors } from '../../redux/selector';

import { NAME } from './constants';

export const [getUserName, getPassword, getLoading, getErrors] = createSelectors(NAME, [
  'username',
  'password',
  'loading',
  'errors',
]);

export default {};
