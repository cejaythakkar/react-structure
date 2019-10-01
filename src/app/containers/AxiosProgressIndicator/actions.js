import { createAction } from '../../redux/action';

import { NAME } from './constants';

export const incrementRequestCount = createAction(`${NAME}/INCREMENT_REQUEST_COUNT`);
export const decrementRequestCount = createAction(`${NAME}/DECREMENT_REQUEST_COUNT`);
