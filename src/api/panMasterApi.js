import axiosClient from './config';
import { URL } from '../shared/url';

export function getPanNumbers() {
  return axiosClient.get(URL.getPanNumbersApi)
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

// export function downloadPan(panNumbers) {
//   return axiosClient.post(URL.downloadPanApi, panNumbers)
//     .then(res => {
//       if (res) {
//         return res;
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       throw error;
//     })
// }
