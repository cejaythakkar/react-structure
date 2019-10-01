/* ***********************************
 * track http requests/responses
 ************************************** */

import axios from 'axios';
import { toast } from 'react-toastify';

import { loggedIn, logout, getToken } from './token-management';

export default class HttpClient {
  constructor() {
    this.loadingProgress = 0;
    this.disconnected = false;
    this.deferredAxiosCalls = [];
    this.axiosInstances = [];
    this.defaultInstance = null;
  }

  // set header for request such as auth token
  setRequestHeader = config => {
    const requestOptions = { ...config };

    if (loggedIn() && !requestOptions.headers.AWS) {
      requestOptions.headers.Authorization = `Bearer ${getToken()}`;
    }

    requestOptions.headers['Accept-Language'] = 'en';
    requestOptions.headers.Expires = '-1';

    requestOptions.headers['Cache-Control'] =
      'no-cache,no-store,must-revalidate,max-age=-1,private';

    return requestOptions;
  };

  // increase counter on each API request
  increment = param => {
    if (this.loadingProgress === 0) {
      // show app loader here
    }

    this.loadingProgress += 1;
    return this.setRequestHeader(param);
  };

  // decrease counter upon receiving response
  decrement = param => {
    if (this.disconnected === true) this.disconnected = false;
    this.loadingProgress -= 1;

    if (this.loadingProgress === 0) {
      // hide app loader here
    }

    return param;
  };

  // error received from API response
  error = param => {
    const requestParams = { ...param };
    this.loadingProgress -= 1;

    if (this.loadingProgress === 0) {
      // hide app loader here
    }

    if (requestParams.message === 'Network Error') {
      if (this.disconnected === false) this.disconnected = true;

      // Add current axios call to deferred because network is offline
      this.deferredAxiosCalls.push(requestParams.config);
      toast.error('Unable to connect to server.');

      requestParams.response = {
        data: {
          success: false,
          unauthorized: true,
          error: 'Network Error',
        },
      };
    } else {
      // Those are 4xx and 5xx errors, not disconnects, and should not be retried
      if (this.disconnected === true) this.disconnected = false;

      if (requestParams.response.status === 400) {
        requestParams.response.data.badRequest = true;
      }

      // Handle Unauthorized error
      if (requestParams.response.data === 'Unauthorized') {
        logout();
        toast.error('Your session has been expired. Please log in again to continue.');

        requestParams.response.data = {
          success: false,
          unauthorized: true,
          error: 'COMMON.UNAUTHORIZED',
        };
      }
    }

    return Promise.reject(requestParams);
  };

  setDefaultInstance = axiosInstance => {
    this.defaultInstance = axiosInstance;
  };

  register = axiosInstance => {
    this.axiosInstances.push(axiosInstance);
    axiosInstance.interceptors.request.use(this.increment, this.error);
    axiosInstance.interceptors.response.use(this.decrement, this.error);
  };

  request = config => {
    return (config.instance || this.defaultInstance || axios).request(config);
  };

  retry = () => {
    while (this.deferredAxiosCalls.length) {
      const cfg = this.deferredAxiosCalls.shift();
      this.request(cfg);
    }
  };
}
