/* *************************************
 * HTTP services (GET, POST) for server calls
 ************************************** */
import axiosInstance from 'axios';

import HttpClient from './http-client';

const basePath = process.env.REACT_APP_ORIGIN;

const httpClient = new HttpClient();
httpClient.setDefaultInstance(axiosInstance);
httpClient.register(axiosInstance);

// http get request
export const get = (url, data = null, headers = {}, includeBase = true) => {
  const finalUrl = includeBase ? basePath + url : url;

  return httpClient
    .request({
      method: 'get',
      url: finalUrl,
      headers,
      params: data,
    })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

// http post request
export const post = (url, data = null, headers = {}, includeBase = true) => {
  const finalUrl = includeBase ? basePath + url : url;

  return httpClient
    .request({
      method: 'post',
      url: finalUrl,
      headers,
      data,
    })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const put = (url, data = null, headers = {}, includeBase = true, progressData) => {
  const finalUrl = includeBase ? basePath + url : url;

  const config = {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (progressData) progressData(percentCompleted);
    },
  };

  return httpClient
    .request({
      method: 'put',
      url: finalUrl,
      headers,
      data,
      onUploadProgress: config.onUploadProgress,
    })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
