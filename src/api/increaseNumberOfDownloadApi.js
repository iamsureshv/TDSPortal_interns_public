import axiosClient from './config';
// import { URL } from '../shared/url';

export function IncreaseNumberOfDownload(userTan,str1) {

  

  return axiosClient.post(`/tds/pdf/increaseNumberOfDownload?employerTan=${userTan}&increaseNumber=${str1}`)
   
    .then(res => {
      if (res) {
        console.log(res)
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
