import axiosClient from './config';
// import { URL } from '../shared/url';

export function getPendingDownload(userTan) {
  return axiosClient.get(`/tds/pdf/downloadRequestPending?tanNumber=${userTan}`)
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
