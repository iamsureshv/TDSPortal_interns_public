import axiosClient from './config';
// import { URL } from '../shared/url';

// export function getMobileUserDownloadRequest(body) {
//   const ddoPan = sessionStorage.getItem("userLogin")

//   return axiosClient.post('tds/pdf/downloadrequest',body)

//   // return axiosClient.get(`/tds/api/getDocumentsPanNumber/${ddoPan}/2023-2024/24Q`)
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



export function getMobileUserDownloadRequest(formdata) {
  return axiosClient.post("tds/pdf/downloadrequest", formdata)
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
