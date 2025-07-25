/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from "axios";
/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: process.env.REACT_APP_Base_Url,
});

client.interceptors.request.use((req) => {
  if (req?.token) {
    req.headers.Authorization = `Bearer ${req?.token}`;
  }
  return req;
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Router.push(redirectTo);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
