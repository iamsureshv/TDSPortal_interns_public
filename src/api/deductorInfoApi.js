import axiosClient from './config';
// import { URL } from '../shared/url';

export function getDeductorInfo(usetPan) {
  return axiosClient.get(`/tds/customer/getProfile?panNumber=${usetPan}`)
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
