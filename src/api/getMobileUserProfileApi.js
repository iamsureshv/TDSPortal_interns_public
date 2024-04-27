import axiosClient from './config';
// import { URL } from '../shared/url';

export function getMobileUserProfile() {
  const ddoPan = sessionStorage.getItem("userLogin")

console.log("user DDO Pan" + ddoPan);
  return axiosClient.get(`/tds/api/getProfile/${ddoPan}`)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}
