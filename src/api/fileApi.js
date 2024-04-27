import axiosClient from './config';
// import { saveAs } from 'file-saver';
// import axios from 'axios'
export function uploadFile(url, data) {
  return axiosClient.post(url, data)
    .then(res => {
      if (res && res.data) {
        return res.data;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

// export function downloadFile(url, data = null, filename = null) {
//   let apiOptions = { url, responseType: 'blob' };
//   if (data) {
//     apiOptions = { ...apiOptions, method: 'post', data }
//   } else {
//     apiOptions = { ...apiOptions, method: 'get' };
//   }

//   axiosClient(apiOptions)
//     .then(res => {
//       if (res) {
//         const fileName = filename || 'download';
//        saveAs(res.data.download_url);

//       }
//     })
//     .catch(error => {
//       console.log(error);
//       throw error;
//     });
// }


// export function downloadFile(userTan) {
//   // const userTan = sessionStorage.getItem('user-tan');

//   return axiosClient.get(`/tds/pdf/getAllDoucuments?ddoTan=${userTan}`)

//     .then(res => {
//       if (res) {

//         if (res.data && res.data.download_url) {
//           const downloadUrl = res.data.download_url;

//           const fileName = 'download';
//           saveAs(downloadUrl);
//         // console.log(res)
//         //       saveAs(res.data.download_url );
//         return res

//         }


//       }
//     })
//     .catch(error => {
//       console.log(error);
//       throw error;
//     })
// }




// export async function downloadFile(url, data = null, filename = null,) {
//   try {
//     let apiOptions = { url, responseType: 'blob' };

//     if (data) {
//       apiOptions = { ...apiOptions, method: 'post', data };
//     } else {
//       apiOptions = { ...apiOptions, method: 'get' };
//     }



//     const response = await axios(apiOptions);
//     if (response.data) {
//       // const fileName = filename || 'download';
//       saveAs(response.data.download_url );
//     }
//   } catch (error) {
//     console.log('Error downloading file:', error);
//     throw error;
//   }
// } 



// export async function downloadFile(url, data = null, authToken) {
//   try {
//     let apiOptions = { url, responseType: 'blob' };

//     if (data) {
//       apiOptions = { ...apiOptions, method: 'post', data };
//     } else {
//       apiOptions = { ...apiOptions, method: 'get' };
//     }

//     if (authToken) {
//       apiOptions.headers = { Authorization: `Bearer ${authToken}` };
//     }

//     const response = await axios(apiOptions);

//     if (response.data) {
//       // const fileName = filename || 'download';
//       // saveAs(response.data.download_url, fileName);
//       console.log(response.data)
//     } else {
//       throw new Error('Invalid response: No data received');
//     }
//   } catch (error) {
//     console.log('Error downloading file:', error);
//     throw error;
//   }
// }



// export async function downloadFile(url, data = null, filename = null,) {
//   try {
//     let apiOptions = { url, responseType: 'blob', method: 'get' };

//     if (data) {
//       apiOptions.data = data;
//     }  

//     const response = await axios(apiOptions);

//     if (response.data) {
//       const fileName = filename || 'download';
//       saveAs(response.data.download_url);
//     } else {
//       throw new Error('Invalid response: No data received');
//     }
//   } catch (error) {
//     console.log('Error downloading file:', error);
//     throw error;
//   }
// }



export function downloadFile(userTan) {
  return axiosClient.get(`/tds/pdf/getAllDoucuments?ddoTan=${userTan}`)

    .then(res => {
      if (res) {

        console.log(res)
        const validationErrors = {};
        res.forEach((item) => {
          validationErrors.email = item.download_url;
        });

        const str = validationErrors.email;
        const newStr = str.slice(25);

        const newStr1 = str.slice(56);

        console.log(newStr)
        console.log(newStr1)


        const link = document.createElement('a');
        link.download = "AYUPM0934H_PARTB_2022-23_2023-06-08-17-12.pdf";
        link.href = "/tds/download/2023-2024/24Q/Q2/AYUPM0934H_PARTB_2022-23_2023-06-08-17-12.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        // saveAs(validationErrors.email,newStr1);


        // var a = document.createElement('a');
        // var linkText = document.createTextNode("my title text");
        // a.appendChild(linkText);
        // a.title = "my title text";
        // a.href = newStr;
        // document.body.appendChild(a);

        // "http://5.189.143.247:9091/tds/download/2023-2024/27Q/Q1/AFGPJ9750H_PARTB_2022-23_2023-06-26-10-45.pdf"
        // const fileURL = window.URL.createObjectURL(newStr);


        //         let alink = document.createElement('a');
        //         alink.href = fileURL;
        //         alink.download = newStr1;
        //         alink.click();


        // const link = document.createElement('a');
        // link.href = newStr;
        // link.download = newStr1;
        // link.click();

        // saveAs(newStr)
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

