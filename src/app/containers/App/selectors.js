import { createSelectors } from '../../redux/selector';

import { NAME } from './constants';

export const [getLoading, getData] = createSelectors(NAME, ['loading', 'data']);

export default {};
