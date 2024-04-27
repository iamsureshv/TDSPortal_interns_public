import axiosClient from './config';
// import { URL } from '../shared/url';

export function getMobileUserDocuments(financialValue,type) {
  const ddoPan = sessionStorage.getItem("userLogin")

  // return axiosClient.get(`/tds/api/getDocumentsPanNumber/${ddoPan}/${financialValue}/${tanType}`)




  return axiosClient.get(`/tds/api/getDocumentsPanNumber/${ddoPan}/${financialValue}/${type}`)

  // return axiosClient.get(`/tds/api/getDocumentsPanNumber/${ddoPan}/2023-2024/24Q`)
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
