import { NAME } from './constants';

export const isLoading = state => !!state[NAME].requestCount;

export default {};
