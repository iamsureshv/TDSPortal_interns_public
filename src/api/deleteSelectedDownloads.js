import axiosClient from './config';
// import { URL } from '../shared/url';



export function deleteSelectedDownloads(formdata) {
  return axiosClient.post(`/tds/pdf/deleteDoucuments?idList=${formdata}`)
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