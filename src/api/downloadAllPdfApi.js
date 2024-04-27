import axiosClient from './config';
import { saveAs } from 'file-saver';
// import axios from 'axios'

export function downloadAllPdfFile() {

  // BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E,BLRM05590E
  const userPan = sessionStorage.getItem("user-tan")

  return axiosClient.get(`/tds/pdf/getAllDoucuments?ddoTan=${userPan}`)

    .then(res => {
      if (res) {
        res.forEach((fileUrl) => {
          const fileName = fileUrl.download_url;
          saveAs(fileName);
          console.log(fileUrl);
        });      
 
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

