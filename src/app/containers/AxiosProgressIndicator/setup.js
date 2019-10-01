import * as actions from './actions';

export default dispatch => axios => {
  axios.interceptors.request.use(
    req => {
      dispatch(actions.incrementRequestCount());
      return req;
    },
    err => {
      dispatch(actions.decrementRequestCount());
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    res => {
      // Do something with response data
      dispatch(actions.decrementRequestCount());
      return res;
    },
    err => {
      dispatch(actions.decrementRequestCount());
      return Promise.reject(err);
    }
  );
};
