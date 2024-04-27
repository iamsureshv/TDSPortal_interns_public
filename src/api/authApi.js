import axiosClient from './config';
import { URL } from '../shared/url';
// import { useHistory } from "react-router-dom";

export function login(data) {
  
  return axiosClient.post(URL.loginApi, data)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function logout() {

  removeAuth();
  return axiosClient.get(URL.logoutApi)
    .then(res => {
      // history.replace("/");

      removeAuth();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function register(data) {
  return axiosClient.post(URL.registerApi, data)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function mobileRegister(data) {
  return axiosClient.post(URL.mobileRegisterApi, data)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function isAuthenticated() {
  const token = sessionStorage.getItem('token');
  return token ? true : false;
}

export function removeAuth() {
  // history.replace("/");

  sessionStorage.clear()
  window.history.replaceState(null, null, "/");
  window.location.href = "/";
}
