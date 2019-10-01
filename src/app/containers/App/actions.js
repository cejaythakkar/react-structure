import { createSetterActions, createAction } from '../../redux/action';

import { NAME } from './constants';

export const [setLoading, setData] = createSetterActions(NAME, ['loading', 'data']);

export const reset = createAction(`${NAME}/RESET`);
