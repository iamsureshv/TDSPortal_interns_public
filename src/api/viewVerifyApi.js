import axiosClient from './config';
import { URL } from '../shared/url';

export function rejectApprove(data) {
  return axiosClient.post(URL.rejectAcceptUserApi, data)
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
