import axiosClient from './config';
import { URL } from '../shared/url';



export function pendingApproveApi(formdata) {
  return axiosClient.post(URL.getPendingApprove, formdata)
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