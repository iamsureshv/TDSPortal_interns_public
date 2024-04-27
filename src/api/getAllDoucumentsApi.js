import axiosClient from './config';
// import { URL } from '../shared/url';

export function getAllDoucuments(userTan) {
  // const userTan = sessionStorage.getItem('user-tan');

  return axiosClient.get(`/tds/pdf/getAllDoucuments?ddoTan=${userTan}`)
   
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

// return axiosClient.get('/tds/pdf/getAllDoucuments?ddoTan=BLRM05590E')

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
