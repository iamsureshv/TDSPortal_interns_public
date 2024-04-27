import axiosClient from './config';
import { URL } from '../shared/url';
import { TANTYPES } from '../shared/constants';

export function getTanApiUrl(type) {
  const urls = {
    fetchUrl: null,
    downloadUrl: null,
  };

  switch (type) {
    case TANTYPES.PENDING:
      urls.fetchUrl = URL.getPendingTanListApi;
      urls.downloadUrl = URL.downloadPendingTanListApi;
      break;
    case TANTYPES.APPROVED:
      urls.fetchUrl = URL.getApprovedTanListApi;
      urls.downloadUrl = URL.downloadApprovedTanListApi;
      break;
    case TANTYPES.REJECTED:
      urls.fetchUrl = URL.getRejectedTanListApi;
      urls.downloadUrl = URL.downloadRejectedTanListApi;
      break;
    case TANTYPES.ACTIVE:
      urls.fetchUrl = URL.getActiveTanListApi;
      urls.downloadUrl = URL.downloadActiveTanListApi;
      break;
    case TANTYPES.INACTIVE:
      urls.fetchUrl = URL.getInactiveTanListApi;
      urls.downloadUrl = URL.downloadInactiveTanListApi;
      break;
    default:
      break;
  }

  return urls;
};

export function getTanList(type) {
  let urls = getTanApiUrl(type);

  if (urls && urls.fetchUrl) {
    return axiosClient.get(urls.fetchUrl)
      .then(res => {
        if (res && res.data && res.data.length) {
          let companyList = [];
          res.data.forEach(user => {
            if (user.company && user.company.length) {
              user.company.forEach(comp => {
                const compObj = {
                  si_no: comp.id,
                  tanNumber: comp.tanNumber,
                  companyName: comp.companyName,
                  mobile: user.mobile,
                  emailId: user.emailId,
                  status: comp.status,
                  userId: user.userId
                };

                companyList.push(compObj);
              });
            }
          });

          return companyList;
        }
      })
      .catch(error => {
        throw error;
      });
  }
};

export function rejectAcceptUser(data) {
  return axiosClient.post(URL.rejectAcceptUserApi, data)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

// export function downloadTanList(type) {
//   let urls = getTanApiUrl(type);

//   if (urls && urls.downloadUrl) {
//     return axiosClient.get(urls.downloadUrl, { responseType: 'blob' })
//       .then(res => {
//         if (res) {
//           return res;
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         throw error;
//       });
//   }
// }
