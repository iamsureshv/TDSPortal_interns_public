import axios from 'axios';
import { toast } from 'react-toastify';

import { logout } from './authApi';
// import { CONSTANTS } from '../shared/constants';


const axiosClient = axios.create({
  // baseURL: CONSTANTS.BASE_URL,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin':  '*',
    // "Access-Control-Allow-Headers":" Auth-Token,Content-Type,Access-Token",
    // "Access-Control-Allow-Headers": "X-Token",
    // "Access-Control-Allow-Methods": "OPTIONS,GET,POST",

    // access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type

    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
    //  'Access-Control-Allow-Headers': 'Content-Type',
    //  'Access-Control-Max-Age': '86400',

  }
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token');
    console.log("User Token "+ token)
  //    const userTan = sessionStorage.getItem('user-tan');
  // if (userTan)
  //     config.params = {
  //       ddoTan: userTan,
  //     };


    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      // if (response.headers && response.headers['content-type'] === 'application/json') {
      //   return response.data;
      // } else {
      //   let filename = response.headers['content-disposition'];
      //   filename = filename.split('filename="')[1].split('"')[0];
      //   return {
      //     data: response.data,
      //     filename
      //   };
      // }
      return response.data;
    }
  },
  function (error) {
    if (error.response) {
      let res = error.response;
      console.log(res);
      // TODO: remove hashmap property. What is even this?
      if (res.status === 400 && res.data && res.data.hashMap) {
        for (const prop in res.data.hashMap) {
          toast.error(res.data.hashMap[prop]);
        }
      }

      if (res.status === 401) {
        toast.error('Unauthorized access. Please login!');
        logout();
      }

      if (res.status === 403) {
        toast.error('Forbidden access. You do not have enough access to view this.');
        logout();
      }

      if (res.status === 417) {
        console.log('Bad request');
        if (res.data.message) {
          console.log('Bad request');

          // toast.error(res.data.message);
        }
      }
    }

    return Promise.reject(error);
  }
)

export default axiosClient;
